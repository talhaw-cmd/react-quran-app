"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./Quran.css"; 

const Quran = () => {
  const [arabicText, setArabicText] = useState("");
  const [translationText, setTranslationText] = useState("");
  const [surahName, setSurahName] = useState("");
  const [ayahNum, setAyahNum] = useState("");
  const [surahNum, setSurahNum] = useState("");
  const [juzNum, setJuzNum] = useState("");
  const [loading, setLoading] = useState(true);

  const getRandomAyah = async () => {
    const randomId = Math.floor(Math.random() * 6236) + 1;
    setLoading(true);

    try {
      const [arabicRes, transRes] = await Promise.all([
        axios.get(`https://api.alquran.cloud/v1/ayah/${randomId}/ur.jalandhri`),
        axios.get(`https://api.alquran.cloud/v1/ayah/${randomId}/ur.ahmedali`)
      ]);

      setArabicText(arabicRes.data.data.text);
      setTranslationText(transRes.data.data.text);
      setSurahName(arabicRes.data.data.surah.name);
      setAyahNum(arabicRes.data.data.numberInSurah);
      setSurahNum(arabicRes.data.data.surah.number);
      setJuzNum(arabicRes.data.data.juz);
      console.log(transRes.data)
    } catch (error) {
      console.error("Error fetching Ayah", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRandomAyah();
  }, []);

  return (
    <div className="hadith-wrapper">
      <div className="card full-width">
        <span className="label">Surah Name</span>
        <h2>{surahName}</h2>
      </div>

      <div className="card full-width">
        <span className="label">Ayah</span>
        <p className="arabic">{arabicText}</p>

        <span className="label">ترجمہ</span>
        <p className="urdu">{translationText}</p>
      </div>

      <div className="card row space full-width">
        <div>
          <span className="label">Ayah #</span>
          <p>{ayahNum}</p>
        </div>
        <div>
          <span className="label">Surah #</span>
          <p>{surahNum}</p>
        </div>
        <div>
          <span className="label">Para #</span>
          <p>{juzNum}</p>
        </div>
      </div>

      <button className="full-width" onClick={getRandomAyah} disabled={loading}>
        {loading ? "Loading..." : "Generate Ayah"}
      </button>
    </div>
  );
};

export default Quran;