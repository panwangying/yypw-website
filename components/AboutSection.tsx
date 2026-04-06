export default function AboutSection() {
  const skills = [
    "JavaScript", "HTML / CSS", "Python", "Java",
    "Leaflet", "Git", "Responsive Design", "C++",
  ];

  return (
    <section className="px-6 md:px-12 py-24">
      <div className="max-w-2xl">

        <span className="block text-[11px] tracking-[0.18em] uppercase text-[#8A8984] mb-8 font-light">
          About
        </span>

        <h1
          className="text-[clamp(32px,5vw,52px)] font-light tracking-[-0.03em] text-[#111110] mb-8 leading-[1.1]"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          应盼望
          <span
            className="block text-[clamp(14px,2vw,18px)] tracking-[0.08em] text-[#5A5955] mt-2 font-light"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Panwang Ying
          </span>
        </h1>

        <p
          className="text-[clamp(16px,2.5vw,20px)] font-light leading-[1.8] text-[#3A3A38] mb-4"
          style={{ fontFamily: "'Noto Serif SC', serif" }}
        >
          就读于圣路易斯华盛顿大学计算机科学硕士，专注于前端与全栈开发。
        </p>
        <p
          className="text-[clamp(16px,2.5vw,20px)] font-light leading-[1.8] text-[#3A3A38] mb-16"
          style={{ fontFamily: "'Noto Serif SC', serif" }}
        >
          热衷于将技术与设计结合，构建清晰、有温度的用户界面。
        </p>

        <span className="block text-[11px] tracking-[0.18em] uppercase text-[#8A8984] mb-6 font-light">
          Skills
        </span>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <span
              key={skill}
              className="text-[12px] tracking-wide text-[#3A3A38] border border-[#D4D3CF] px-4 py-1.5 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}