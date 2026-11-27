"use server";

import crypto from "crypto";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { Directory } from "@/models/directory";
import { getCurrentUserAction } from "@/actions/auth-actions";

function slugify(text) {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function generateNanoId(size = 6) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  const bytes = crypto.randomBytes(size);
  for (let i = 0; i < size; i++) {
    id += chars[bytes[i] % chars.length];
  }
  return id;
}

export async function checkSlugAvailabilityAction(rawSlug, excludeId = null) {
  try {
    await connectDB();
    const cleanSlug = slugify(rawSlug) || "contact";

    const query = { slug: cleanSlug };
    if (excludeId && excludeId.match(/^[0-9a-fA-F]{24}$/)) {
      query._id = { $ne: excludeId };
    }

    const existing = await Directory.findOne(query).lean();
    if (!existing) {
      return { available: true, slug: cleanSlug };
    }

    const suggestedSlug = `${cleanSlug}-${generateNanoId(6)}`;
    return { available: false, slug: cleanSlug, suggestedSlug };
  } catch (err) {
    console.error("checkSlugAvailabilityAction error:", err);
    return { available: false, slug: rawSlug, suggestedSlug: `${rawSlug}-${generateNanoId(6)}` };
  }
}

export async function resolveSlugForNameAction(name, excludeId = null) {
  try {
    await connectDB();
    const baseSlug = slugify(name) || "contact";

    const query = { slug: baseSlug };
    if (excludeId && excludeId.match(/^[0-9a-fA-F]{24}$/)) {
      query._id = { $ne: excludeId };
    }

    const existing = await Directory.findOne(query).lean();
    if (!existing) {
      return { slug: baseSlug, isUnique: true };
    }

    const uniqueSlug = `${baseSlug}-${generateNanoId(6)}`;
    return { slug: uniqueSlug, isUnique: false };
  } catch (err) {
    console.error("resolveSlugForNameAction error:", err);
    return { slug: `${slugify(name) || "contact"}-${generateNanoId(6)}`, isUnique: false };
  }
}

export async function getApprovedDirectoryAction({
  page = 1,
  limit = 8,
  search = "",
  category = "All",
  taluka = "All Talukas",
} = {}) {
  try {
    await connectDB();

    const query = { status: "approved" };

    if (search && search.trim()) {
      const regex = new RegExp(search.trim(), "i");
      query.$or = [
        { name: regex },
        { category: regex },
        { address: regex },
        { town: regex },
        { taluka: regex },
        { phone: regex },
      ];
    }

    if (category && category !== "All" && category !== "All Categories") {
      query.category = { $regex: new RegExp(`^${category}$`, "i") };
    }

    if (taluka && taluka !== "All Talukas") {
      query.taluka = taluka;
    }

    const currentPage = Math.max(1, parseInt(page, 10) || 1);
    const pageLimit = Math.max(1, parseInt(limit, 10) || 8);
    const skip = (currentPage - 1) * pageLimit;

    const [total, docs] = await Promise.all([
      Directory.countDocuments(query),
      Directory.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(pageLimit)
        .lean(),
    ]);

    const items = docs.map((doc) => ({
      id: doc._id.toString(),
      slug: doc.slug || doc._id.toString(),
      name: doc.name,
      category: doc.category,
      phone: doc.phone,
      altPhone: doc.altPhone || "",
      whatsapp: doc.whatsapp || "",
      email: doc.email || "",
      timing: doc.timing || "",
      address: doc.address,
      town: doc.town || doc.taluka,
      taluka: doc.taluka,
      image: doc.image || "/images/directory/shops.svg",
      gallery: doc.gallery || [],
      description: doc.description || "",
      services: doc.services || [],
      verified: doc.verified ?? false,
      status: doc.status,
    }));

    return {
      items,
      total,
      page: currentPage,
      limit: pageLimit,
      totalPages: Math.ceil(total / pageLimit) || 1,
    };
  } catch (err) {
    console.error("getApprovedDirectoryAction error:", err);
    return {
      items: [],
      total: 0,
      page: 1,
      limit,
      totalPages: 1,
    };
  }
}

export async function getDirectoryItemAction(idOrSlug) {
  try {
    await connectDB();
    let doc = null;

    doc = await Directory.findOne({ slug: idOrSlug }).lean();

    if (!doc && idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      doc = await Directory.findById(idOrSlug).lean();
    }

    if (!doc) {
      doc = await Directory.findOne({
        name: { $regex: new RegExp(`^${idOrSlug.replace(/-/g, " ")}$`, "i") },
      }).lean();
    }

    if (!doc) return null;

    return {
      id: doc._id.toString(),
      slug: doc.slug || doc._id.toString(),
      name: doc.name,
      category: doc.category,
      phone: doc.phone,
      altPhone: doc.altPhone || "",
      whatsapp: doc.whatsapp || "",
      email: doc.email || "",
      timing: doc.timing || "",
      address: doc.address,
      town: doc.town || doc.taluka,
      taluka: doc.taluka,
      image: doc.image || "/images/directory/shops.svg",
      gallery: doc.gallery || [],
      description: doc.description || "",
      services: doc.services || [],
      verified: doc.verified ?? false,
      status: doc.status,
    };
  } catch (err) {
    console.error("getDirectoryItemAction error:", err);
    return null;
  }
}

export async function createDirectoryAction(formData, { fromAdmin = false } = {}) {
  try {
    await connectDB();
    const user = await getCurrentUserAction();
    const isAdmin = user?.role === "admin";

    let targetSlug = slugify(formData.slug || formData.name) || "contact";
    const existing = await Directory.findOne({ slug: targetSlug }).lean();
    if (existing) {
      targetSlug = `${targetSlug}-${generateNanoId(6)}`;
    }

    const defaultImage =
      formData.category === "CA"
        ? "/images/directory/ca.svg"
        : formData.category === "Advocates"
        ? "/images/directory/advocate.svg"
        : formData.category === "Medical Stores"
        ? "/images/directory/medical.svg"
        : formData.category === "Hospitals"
        ? "/images/directory/hospital.svg"
        : formData.category === "Govt Offices"
        ? "/images/directory/govt.svg"
        : formData.category === "Temples"
        ? "/images/directory/temple.svg"
        : "/images/directory/shops.svg";

    const finalStatus = fromAdmin && isAdmin ? formData.status || "approved" : "pending";
    const finalVerified = finalStatus === "approved";

    const newDoc = await Directory.create({
      name: formData.name,
      slug: targetSlug,
      category: formData.category,
      phone: formData.phone,
      altPhone: formData.altPhone || "",
      whatsapp: formData.whatsapp || formData.phone?.replace(/[^0-9]/g, "") || "",
      email: formData.email || "",
      timing: formData.timing || "09:00 AM - 08:00 PM",
      address: formData.address,
      town: formData.town || formData.taluka,
      taluka: formData.taluka,
      image: formData.image || defaultImage,
      gallery: [formData.image || defaultImage],
      description: formData.description || "",
      services: Array.isArray(formData.services)
        ? formData.services
        : typeof formData.services === "string"
        ? formData.services.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
      verified: finalVerified,
      status: finalStatus,
    });

    revalidatePath("/directory");
    revalidatePath("/admin/directory");

    return {
      success: true,
      id: newDoc._id.toString(),
      slug: newDoc.slug,
      status: newDoc.status,
    };
  } catch (err) {
    return { success: false, error: err.message || "Failed to create listing" };
  }
}

export async function getAllDirectoryAdminAction({
  page = 1,
  limit = 10,
  search = "",
  category = "All",
  taluka = "All",
  status = "All",
} = {}) {
  try {
    const user = await getCurrentUserAction();
    if (user?.role !== "admin") {
      throw new Error("Unauthorized");
    }

    await connectDB();

    const query = {};

    if (status && status !== "All") {
      query.status = status;
    }

    if (category && category !== "All") {
      query.category = { $regex: new RegExp(`^${category}$`, "i") };
    }

    if (taluka && taluka !== "All") {
      query.taluka = taluka;
    }

    if (search && search.trim()) {
      const regex = new RegExp(search.trim(), "i");
      query.$or = [
        { name: regex },
        { slug: regex },
        { phone: regex },
        { address: regex },
        { town: regex },
        { taluka: regex },
      ];
    }

    const currentPage = Math.max(1, parseInt(page, 10) || 1);
    const pageLimit = Math.max(1, parseInt(limit, 10) || 10);
    const skip = (currentPage - 1) * pageLimit;

    const [total, docs] = await Promise.all([
      Directory.countDocuments(query),
      Directory.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(pageLimit)
        .lean(),
    ]);

    const items = docs.map((doc) => ({
      id: doc._id.toString(),
      slug: doc.slug || doc._id.toString(),
      name: doc.name,
      category: doc.category,
      phone: doc.phone,
      altPhone: doc.altPhone || "",
      whatsapp: doc.whatsapp || "",
      email: doc.email || "",
      timing: doc.timing || "",
      address: doc.address,
      town: doc.town || doc.taluka,
      taluka: doc.taluka,
      image: doc.image || "/images/directory/shops.svg",
      gallery: doc.gallery || [],
      description: doc.description || "",
      services: doc.services || [],
      verified: doc.verified ?? false,
      status: doc.status,
      createdAt: doc.createdAt?.toISOString?.() || null,
    }));

    return {
      items,
      total,
      page: currentPage,
      limit: pageLimit,
      totalPages: Math.ceil(total / pageLimit) || 1,
    };
  } catch (err) {
    console.error("getAllDirectoryAdminAction error:", err);
    return {
      items: [],
      total: 0,
      page: 1,
      limit,
      totalPages: 1,
    };
  }
}

export async function updateDirectoryStatusAction(id, status) {
  try {
    const user = await getCurrentUserAction();
    if (user?.role !== "admin") throw new Error("Unauthorized");

    await connectDB();
    await Directory.findByIdAndUpdate(id, {
      status,
      verified: status === "approved",
    });

    revalidatePath("/directory");
    revalidatePath("/admin/directory");
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

export async function updateDirectoryItemAction(id, data) {
  try {
    const user = await getCurrentUserAction();
    if (user?.role !== "admin") throw new Error("Unauthorized");

    await connectDB();

    let targetSlug = slugify(data.slug || data.name);
    if (!targetSlug) targetSlug = "contact";

    const existing = await Directory.findOne({
      slug: targetSlug,
      _id: { $ne: id },
    }).lean();

    if (existing) {
      targetSlug = `${targetSlug}-${generateNanoId(6)}`;
    }

    await Directory.findByIdAndUpdate(id, {
      name: data.name,
      slug: targetSlug,
      category: data.category,
      phone: data.phone,
      altPhone: data.altPhone || "",
      whatsapp: data.whatsapp || "",
      email: data.email || "",
      timing: data.timing || "",
      address: data.address,
      town: data.town || data.taluka,
      taluka: data.taluka,
      description: data.description || "",
      services: Array.isArray(data.services)
        ? data.services
        : typeof data.services === "string"
        ? data.services.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
      status: data.status,
      verified: data.status === "approved",
    });

    revalidatePath("/directory");
    revalidatePath("/admin/directory");
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

export async function deleteDirectoryAction(id) {
  try {
    const user = await getCurrentUserAction();
    if (user?.role !== "admin") throw new Error("Unauthorized");

    await connectDB();
    await Directory.findByIdAndDelete(id);

    revalidatePath("/directory");
    revalidatePath("/admin/directory");
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
