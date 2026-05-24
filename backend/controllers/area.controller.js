import { Area } from "../models/area.model.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateAreasWithAI = async (req, res, next) => {
  try {
    const { cityAddress } = req.body;

    if (!cityAddress) {
      return res.status(400).json({ message: "City address is required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // ---------------------------------------------------------
    // THE CRITICAL PART: STRICT & DETAILED PROMPT
    // ---------------------------------------------------------
    const prompt = `
      Act as a Location Data Expert.
      I need a comprehensive database of areas for the city of "${cityAddress}".
      
      Requirements:
      1. Identify 10-15 major administrative zones, wards, or sectors in "${cityAddress}".
      2. For EACH zone, provide the **REAL and ACCURATE** Pin Code / Zip Code. Do not guess; use the actual postal code.
      3. For EACH zone, list 5 - 10 specific localities, neighborhoods, or colonies that officially fall under that Pin Code.
      
      Output strictly valid JSON (no markdown, no comments) in this structure:
      [
        {
          "name": "Name of Area/Sector (e.g., Connaught Place)",
          "zipCode": "110001",
          "localities": ["Inner Circle", "Outer Circle", "Barakhamba Road", "Janpath"]
        }
      ]
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean the response (Remove ```json and ``` markers if present)
    const jsonString = text.replace(/```json|```/g, "").trim();
    let areasData;

    try {
      areasData = JSON.parse(jsonString);
    } catch (parseError) {
      return res
        .status(500)
        .json({ message: "AI generated invalid JSON. Please try again." });
    }

    // Attach the Mayor's ID to every area
    const areasToInsert = areasData.map((area) => ({
      ...area,
      createdBy: req.user._id,
    }));

    // Insert into Database (Skip duplicates using ordered: false)
    const createdAreas = await Area.insertMany(areasToInsert, {
      ordered: false,
    });

    res.status(201).json({
      success: true,
      message: `Successfully populated ${cityAddress} with ${createdAreas.length} areas and their localities.`,
      data: createdAreas,
    });
  } catch (error) {
    // Handle partial success (Duplicate keys)
    if (error.code === 11000) {
      return res.status(206).json({
        success: true,
        message:
          "Data processed. Some areas were skipped because they already exist.",
      });
    }
    next(error);
  }
};

export const getAllAreas = async (req, res, next) => {
  try {
    const areas = await Area.find().select("name zipCode localities");

    res.status(200).json({
      success: true,
      count: areas.length,
      areas,
    });
  } catch (error) {
    next(error);
  }
};
