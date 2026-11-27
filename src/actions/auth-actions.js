"use server";

import crypto from "crypto";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/db";
import { User, Session } from "@/models/user";

export async function sendOtpAction(phone) {
  try {
    if (!phone || phone.trim().length < 10) {
      return { success: false, error: "Please enter a valid phone number" };
    }

    const cleanPhone = phone.replace(/[^0-9]/g, "").slice(-10);
    await connectDB();

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    let user = await User.findOne({ phone: cleanPhone });

    if (!user) {
      const defaultRole = cleanPhone === "9999999999" ? "admin" : "user";
      user = await User.create({
        phone: cleanPhone,
        name: `User ${cleanPhone.slice(-4)}`,
        role: defaultRole,
        otp,
        otpExpires,
      });
    } else {
      user.otp = otp;
      user.otpExpires = otpExpires;
      await user.save();
    }

    return {
      success: true,
      message: `OTP sent successfully. Demo OTP: ${otp}`,
      demoOtp: otp,
    };
  } catch (error) {
    return { success: false, error: error.message || "Failed to send OTP" };
  }
}

export async function verifyOtpAction(phone, otp) {
  try {
    if (!phone || !otp) {
      return { success: false, error: "Phone number and OTP are required" };
    }

    const cleanPhone = phone.replace(/[^0-9]/g, "").slice(-10);
    const cleanOtp = otp.trim();

    await connectDB();

    const user = await User.findOne({ phone: cleanPhone });
    if (!user) {
      return { success: false, error: "User not found. Please request a new OTP." };
    }

    if (!user.otp || user.otp !== cleanOtp) {
      return { success: false, error: "Invalid OTP. Please check and try again." };
    }

    if (new Date() > new Date(user.otpExpires)) {
      return { success: false, error: "OTP has expired. Please request a new one." };
    }

    user.otp = null;
    user.otpExpires = null;
    await user.save();

    const sessionToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await Session.create({
      userId: user._id,
      token: sessionToken,
      expiresAt,
    });

    const cookieStore = await cookies();
    cookieStore.set("portal_session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: expiresAt,
      path: "/",
    });

    return {
      success: true,
      user: {
        id: user._id.toString(),
        phone: user.phone,
        name: user.name,
        role: user.role,
      },
    };
  } catch (error) {
    return { success: false, error: error.message || "Verification failed" };
  }
}

export async function getCurrentUserAction() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("portal_session")?.value;

    if (!token) {
      return null;
    }

    await connectDB();
    const session = await Session.findOne({ token, expiresAt: { $gt: new Date() } }).populate("userId");

    if (!session || !session.userId) {
      return null;
    }

    const user = session.userId;
    return {
      id: user._id.toString(),
      phone: user.phone,
      name: user.name,
      role: user.role,
    };
  } catch {
    return null;
  }
}

export async function logoutAction() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("portal_session")?.value;

    if (token) {
      await connectDB();
      await Session.deleteOne({ token });
    }

    cookieStore.delete("portal_session");
    return { success: true };
  } catch {
    return { success: false };
  }
}
