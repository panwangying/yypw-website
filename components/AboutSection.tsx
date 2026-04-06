export default function AboutSection() {
    const skills = [
      "JavaScript", "HTML / CSS", "Python", "Java",
      "Leaflet", "Git", "Responsive Design", "C++",
    ];
  
    return (
      <section className="px-6 md:px-12 py-24 border-t border-[#E4E3DF]">
        <div className="max-w-2xl">
  
          {/* 标签 */}
          <span className="block text-[11px] tracking-[0.18em] uppercase text-[#C8C7C2] mb-8 font-light">
            About
          </span>
  
          {/* 介绍 */}
          <p className="text-[clamp(16px,2.5vw,20px)] font-light leading-[1.8] text-[#3A3A38] mb-6"
            style={{ fontFamily: "'Noto Serif SC', serif" }}>
            就读于圣路易斯华盛顿大学计算机科学硕士，专注于前端与全栈开发。
          </p>
          <p className="text-[clamp(16px,2.5vw,20px)] font-light leading-[1.8] text-[#3A3A38] mb-16"
            style={{ fontFamily: "'Noto Serif SC', serif" }}>
            热衷于将技术与设计结合，构建清晰、有温度的用户界面。
          </p>
  
          {/* 技能 */}
          <span className="block text-[11px] tracking-[0.18em] uppercase text-[#C8C7C2] mb-6 font-light">
            Skills
          </span>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="text-[12px] tracking-wide text-[#5A5955] border border-[#E4E3DF] px-4 py-1.5 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
  
        </div>
      </section>
    );
  }