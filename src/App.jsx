import React, { useState, useEffect } from "react";
import content from "./langContent"; // Assuming you have a content.json file for translations
import { MdOutlineFileDownload } from "react-icons/md";
import mypic from "./assets/png/mypic.jpg"; // Replace with your actual image path
import PortImage from "./portimage"; // Import your portfolio image component
import { FaLinkedin } from "react-icons/fa";
import emailjs from "emailjs-com";
import mypdf from "./assets/png/mypic.jpg"; // Path to your resume PDF

export default function App() {
  const [lang, setLang] = useState("en"); // ภาษาเริ่มต้นไทย
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const sections = ["home", "about", "skill", "portfolio", "contact"];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    document: "all",
  });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);

    let attccdoc =
      "https://drive.google.com/file/d/1Vcdt8ZpgZKSifDB1iu8MiU4mxBzJiSka/view?usp=sharing";
    let attachmentLink = "";
    if (formData.document === t.op_thai) {
      attachmentLink =
        "https://drive.google.com/file/d/15aSoSdXZ0Kz2hEZfTx9Pv1UJ2v-0298N/view?usp=sharing";
    } else if (formData.document === t.op_eng) {
      attachmentLink =
        "https://drive.google.com/file/d/1c4y4815OCJeXEbWQToLnJYSNkW9D4VFL/view?usp=sharing";
    } else {
      attachmentLink =
        "https://drive.google.com/file/d/1c4y4815OCJeXEbWQToLnJYSNkW9D4VFL/view?usp=sharing";
    }

    const templateParams = {
      user_name: formData.name,
      user_email: formData.email,
      document_type: formData.document,
      attachment_link: attachmentLink,
      attccdoc_link: attccdoc,
      message: `Dear K.${formData.name},

Please find attached the document you requested. Should you have any questions or require further information, please do not hesitate to contact me.

Thank you for your attention.

Best regards,
Thammachat Mingkhwan
phone: 0638830905`,
    };

    emailjs
      .send(
        "service_bksllfa",
        "template_0v5k899",
        templateParams,
        "DwArlTe0JPq4swy8n"
      )
      .then(
        () => {
          alert("ส่งอีเมลสำเร็จ!");
          setFormData({ name: "", email: "", document: t.op_all });
          setSending(false);
        },
        (error) => {
          alert("ส่งอีเมลล้มเหลว: " + error.text);
          setSending(false);
        }
      );
  };

  const data = {
    frontend: [
      "React",
      "HTML",
      "CSS",
      "Tailwind",
      "Bootstrap",
      "Flutter",
      "JavaScript",
      "TypeScript",
      "Ajax",
      "Android Studio",
      "Figma",
    ],
    backend: [
      "PHP",
      "C# .NET MVC",
      "Node.js",
      "Java",
      "SQL",
      "MySQL",
      "MQTT",
      "C#",
      "C++",
      "Arduino",
      "Node-RED",
    ],
    tools: [
      "SSMS",
      "VS Code",
      "Visual Studio",
      "GitHub",
      "Arduino IDE",
      "Cisco",
    ],
    productivity: [
      "Word",
      "Excel",
      "PowerPoint",
      "Power BI",
      "Power Apps",
      "Copilot",
      "ChatGPT",
      "V0",
    ],
  };

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  useEffect(() => {
    function onScroll() {
      const scrollPos = window.scrollY + window.innerHeight / 3; // ปรับจุดเช็คให้เหมาะสม
      let currentSection = activeSection;

      for (const id of sections) {
        const section = document.getElementById(id);
        if (section) {
          if (scrollPos >= section.offsetTop) {
            currentSection = id;
          }
        }
      }
      setActiveSection(currentSection);
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const t = content[lang];

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-gray-100 dark:bg-gray-800 shadow-md z-20">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
          <div className="text-xl font-bold cursor-pointer">Portfolio</div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8">
            {sections.map((section) => (
              <li key={section}>
                <a
                  href={`#${section}`}
                  onClick={handleLinkClick}
                  className={`hover:text-blue-500 ${
                    activeSection === section
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : ""
                  }`}
                >
                  {t[section]}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setLang(lang === "th" ? "en" : "th")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
              aria-label="Switch language"
            >
              {lang === "th" ? "EN" : "TH"}
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="bg-gray-300 dark:bg-gray-700 p-2 rounded"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? "🌞" : "🌙"}
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8h16M4 16h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <ul className="md:hidden bg-gray-100 dark:bg-gray-800 px-6 pb-4 space-y-4">
            {sections.map((section) => (
              <li key={section}>
                <a
                  href={`#${section}`}
                  onClick={handleLinkClick}
                  className={`block hover:text-blue-500 ${
                    activeSection === section
                      ? "text-blue-600 font-semibold"
                      : ""
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        )}
      </nav>

      {/* Sections */}
      <main className="pt-0">
        <section
          id="home"
          className="pt-0 min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800"
        >
          <div className="pt-0 max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 py-20">
            <div className="text-center">
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                {t.intro}
              </p>
              <h1 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t.fullname}
              </h1>
              <h2 className="text-2xl md:text-3xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ( {t.nickname} ){" "}
              </h2>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-200 mb-6">
                {t.fullstack}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                {t.experienced}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {/* <Button  className="bg-blue-600 hover:bg-blue-700">
                  <Download className="mr-2 h-4 w-4" />
                  {t.hero.downloadCV}
                </Button> */}

                <button
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = {mypdf}; // พาธไฟล์เรซูเม่ใน public folder
                    link.download = "Thammachat_Mingkhwan_Resume.jpg"; // ชื่อไฟล์เวลาดาวน์โหลด
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition flex items-center"
                >
                  <MdOutlineFileDownload className="mr-2 h-4 w-4" />
                  {t.downloadCV}
                </button>
              </div>
            </div>
          </div>
          <hr />
        </section>

        <section
          id="about"
          className="pt-20 pb-20 min-h-screen flex items-center justify-center bg-white dark:bg-gray-800"
        >
          {/* ฝั่งซ้าย */}
          <div className="md:w-1/2 flex flex-col items-center md:items-start p-6 pl-20 ">
            {/* รูปวงกลม */}
            <img
              src={mypic} // เปลี่ยนเป็น path รูปจริง
              alt="Profile"
              className="rounded-full w-48 h-48 object-cover mb-6 shadow-lg"
            />
            {/* รายละเอียดส่วนตัว */}
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
                {t.fullname}
              </h2>
              <b> ( {t.position} )</b>
              &nbsp; <br />
              <hr />
              &nbsp; <br />
              <p className=" dark:text-gray-400 max-w-md">
                <b>{t.myinformation}</b> <br />
                {t.myfullname} <br />
                {t.mynickname} <br />
                {t.age} <br />
                {t.birday} <br />
                {t.sex}
              </p>
              <hr />
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                <b> {t.education}</b>
              </p>
              <p className="text-gray-600 dark:text-gray-400 max-w-md">
                {t.basorloderee} <br />
                {t.major} <br />
                {t.univercity} <br />
                {t.higschschool} <br />
                {t.school}
              </p>
            </div>
          </div>

          {/* ฝั่งขวา */}
          <div className="md:w-1/2 p-6">
            <h2 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-white">
              {t.experice}
            </h2>
            <ul className="space-y-4 text-gray-700 dark:text-gray-300">
              <li>
                <h3 className="text-xl font-bold">{t.sonyposition}</h3>
                <p dangerouslySetInnerHTML={{ __html: t.sony }}></p>
              </li>
              <li>
                <h3 className="text-xl font-bold">{t.maejardposition}</h3>
                <p dangerouslySetInnerHTML={{ __html: t.maejard }}></p>
              </li>
              <li>
                <h3 className="text-xl font-bold">{t.gobalhouseposition}</h3>
                <p dangerouslySetInnerHTML={{ __html: t.gobalhouse }}></p>
              </li>
              <li>
                <h3 className="text-xl font-bold">{t.gobalhouseposition}</h3>
                <p dangerouslySetInnerHTML={{ __html: t.kce }}></p>
              </li>
            </ul>
          </div>
        </section>
        <section
          id="skill"
          className="pt-20 min-h-screen bg-teal-50 dark:bg-gray-700"
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            {/* หัวข้อใหญ่ span ครบทั้งหมด */}
            <h2 className="text-4xl font-extrabold mb-12 text-center text-teal-900 dark:text-teal-300">
              {t.skillContent}
            </h2>

            {/* ปรับเป็น 2 คอลัมน์แทน */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Frontend */}
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-center md:text-left text-teal-800 dark:text-teal-200">
                  Frontend
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {data.frontend.map((tech) => (
                    <div
                      key={tech}
                      className="border border-teal-300 rounded-lg p-4 shadow-sm hover:shadow-md transition cursor-default bg-white dark:bg-gray-800"
                    >
                      <p className="text-center font-medium text-teal-900 dark:text-teal-100">
                        {tech}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Backend */}
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-center md:text-left text-teal-800 dark:text-teal-200">
                  Backend
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {data.backend.map((tech) => (
                    <div
                      key={tech}
                      className="border border-teal-300 rounded-lg p-4 shadow-sm hover:shadow-md transition cursor-default bg-white dark:bg-gray-800"
                    >
                      <p className="text-center font-medium text-teal-900 dark:text-teal-100">
                        {tech}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-center md:text-left text-teal-800 dark:text-teal-200">
                  Tools
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {data.tools.map((tech) => (
                    <div
                      key={tech}
                      className="border border-teal-300 rounded-lg p-4 shadow-sm hover:shadow-md transition cursor-default bg-white dark:bg-gray-800"
                    >
                      <p className="text-center font-medium text-teal-900 dark:text-teal-100">
                        {tech}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Productivity */}
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-center md:text-left text-teal-800 dark:text-teal-200">
                  Productivity
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {data.productivity.map((tech) => (
                    <div
                      key={tech}
                      className="border border-teal-300 rounded-lg p-4 shadow-sm hover:shadow-md transition cursor-default bg-white dark:bg-gray-800"
                    >
                      <p className="text-center font-medium text-teal-900 dark:text-teal-100">
                        {tech}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <br />
        </section>

        <section
          id="portfolio"
          className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900"
        >
          <h2 className="text-4xl font-semibold mb-8">{t.portfolioContent}</h2>
          <PortImage />
        </section>

        <section
          id="contact"
          className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-800"
        >
          <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Left: Contact Info */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow">
              <h2 className="text-3xl font-bold mb-6 text-teal-600 dark:text-teal-400">
                {t.contacts} {/* Use the contact title from langContent */}
              </h2>

              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li>📍 {t.address}</li>
                <li>📱 {t.phone}</li>
                <li>📧 Email: khaen.slopy@gmail.com</li>
                <li>🆔 Line ID: tong9948</li>
                {/* <a href="www.youtube.com"></a><FaLinkedin /> */}
                <button className="text-blue-600 dark:text-blue-400 hover:underline">
                  <a
                    href="https://www.linkedin.com/in/khaen-slopy-2b3513283/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin className="inline mr-5" />
                    LinkedIn Profile
                  </a>
                </button>
              </ul>
            </div>

            {/* Right: Form */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow">
              <h2 className="text-3xl font-bold mb-6 text-teal-600 dark:text-teal-400">
                {t.transcript}
              </h2>
              <form
                onSubmit={handleSubmit}
                className="space-y-4 max-w-md mx-auto"
              >
                <div>
                  <label className="block mb-1 text-sm font-medium">
                    {t.fo_name}
                  </label>
                  <input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:border-gray-600"
                    placeholder="กรอกชื่อ-นามสกุล"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">
                    {t.fo_email}
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:border-gray-600"
                    placeholder="กรอกอีเมล"
                  />
                </div>
                {/* <div>
                  <label className="block mb-1 text-sm font-medium">
                    {t.catyegiry_doc}
                  </label>
                  <select
                    name="document"
                    value={formData.document}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:border-gray-600"
                  >
                    <option>{t.op_all}</option>
                    <option>{t.op_thai}</option>
                    <option>{t.op_eng}</option>
                  </select>
                </div> */}
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition disabled:opacity-50"
                >
                  {sending ? "กำลังส่ง..." : "submit"}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 dark:bg-gray-900 py-4 fixed bottom-0 left-0 w-full z-50">
        <div className="border-t border-gray-300 dark:border-gray-700 pt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Thammachat Mingkhwan — All rights
          reserved.
        </div>
      </footer>
    </div>
  );
}
