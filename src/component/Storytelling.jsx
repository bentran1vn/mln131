import React, { useState, useEffect } from "react";
import {
  Book,
  Users,
  Target,
  ArrowRight,
  Factory,
  Briefcase,
  Brain,
  Globe,
  Stethoscope,
  GraduationCap,
  Computer,
  Share2,
  TrendingUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import section3 from "../assets/thumbnail.jpg";
import TableOfContents from "./TableContent";
import FloatingOrbsFeatures from "./FloatingOrbsFeatures";
import BackgroundMusic from "@/src/component/BackgroundMusic";

const TimelineNav = ({ currentSection }) => {
  const sections = [
    { id: "hero", label: "Giới thiệu" },
    { id: "section1", label: "Chủ nghĩa xã hội" },
    { id: "section2", label: "Những đặc trưng bản chất của chủ nghĩa xã hội" },
    {
      id: "section3",
      label: "Thời kỳ quá độ lên chủ nghĩa xã hội tại Việt Nam",
    },
    { id: "section4", label: "Kết Luận" },
    { id: "section5", label: "Trả lời câu hỏi" },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40">
      <div className="flex flex-col items-center gap-4">
        {sections.map((section) => (
          <div
            key={section.id}
            className="group relative flex items-center"
            onClick={() => scrollToSection(section.id)}
          >
            <div
              className={`w-4 h-2  cursor-pointer transition-all duration-300 ${
                currentSection === section.id
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/80"
              }`}
            />
            <div className="hidden group-hover:block absolute right-full mr-2">
              <span className="whitespace-nowrap bg-white/10 backdrop-blur-md text-white text-sm py-1 px-2 rounded">
                {section.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const StorySection = ({ children, bgImage, title, subtitle, id }) => (
  <section
    id={id}
    className="min-h-screen relative flex items-center justify-center overflow-hidden snap-start"
  >
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
      style={{
        backgroundImage: `url(${bgImage})`,
        filter: "brightness(0.3)",
      }}
    />
    <div className="relative z-10 container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xl text-white/80 max-w-2xl mx-auto">{subtitle}</p>
        )}
      </motion.div>
      {children}
    </div>
  </section>
);

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ y: -5 }}
    className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
  >
    <div className="flex items-center gap-4 mb-4">
      <div className="p-3 bg-white/20 rounded-full">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
    </div>
    <p className="text-white/80 leading-relaxed">{description}</p>
  </motion.div>
);

const TimelineItem = ({ year, title, description, isRight, image }) => (
  <div className="relative w-full mb-16">
    <div className="md:flex items-center justify-between">
      {/* Image Section */}
      <motion.div
        initial={{ opacity: 0, x: isRight ? 30 : -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        className={`w-full md:w-[42%] ${isRight ? "md:order-2" : "md:order-1"}`}
      >
        <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      </motion.div>

      {/* Center Line and Dot Container */}
      <div className="hidden md:block relative w-[8%]">
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/20 -translate-x-1/2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full" />
      </div>

      {/* Content Section */}
      <motion.div
        initial={{ opacity: 0, x: isRight ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        className={`w-full md:w-[42%] ${isRight ? "md:order-1" : "md:order-2"}`}
      >
        <div
          className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20`}
        >
          <div className="text-white/60 mb-2">{year}</div>
          <h3 className="text-2xl font-semibold text-white mb-3">{title}</h3>
          <p className="text-white/80 leading-relaxed">{description}</p>
        </div>
      </motion.div>
    </div>
  </div>
);

const StorytellingPage = () => {
  const [currentSection, setCurrentSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "hero",
        "section1",
        "section2",
        "section3",
        "section4",
        "section5",
      ];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className=" min-h-screen snap-y snap-mandatory overflow-y-auto">
      <TimelineNav currentSection={currentSection} />
      {/* Hero Section */}
      <StorySection
        id="hero"
        bgImage="https://res.cloudinary.com/monkeysuper/image/upload/v1736857857/uufn23xuobxtwanflwp4.jpg"
        // title=""
        // subtitle="Chương 3"
        // className=""
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 250 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex justify-between items-center border-white/30 border px-6 py-3 hover:bg-white/10 transition-colors rounded-full gap-2">
            <button
              onClick={() => scrollToSection("section1")}
              className="text-white font-medium text-3xl max-w-[80%] text-center"
            >
              Chủ nghĩa xã hội và thời kỳ quá độ lên chủ nghĩa xã hội
            </button>
            <BackgroundMusic src="https://res.cloudinary.com/monkeysuper/video/upload/v1736880869/ttqxhtkszvczdxkp99vj.mp3" />
          </div>
        </motion.div>
      </StorySection>

      {/* <TableOfContents scrollToSection={scrollToSection} /> */}

      {/* Section 1: Quan điểm cơ bản */}
      <StorySection
        id="section1"
        bgImage="data:image/jpeg;base64,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"
        title="I. Chủ nghĩa xã hội"
      >
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <FeatureCard
            icon={Book}
            title="1. Định nghĩa và ý nghĩa của chủ nghĩa xã hội"
            description="Chủ nghĩa xã hội (CNXH) là một mô hình tổ chức xã hội, kinh tế và chính trị, trong đó tài sản chủ yếu thuộc sở hữu công cộng hoặc tập thể, hướng tới mục tiêu xây dựng một xã hội bình đẳng, không còn áp bức và bóc lột. CNXH đề cao sự phát triển toàn diện của con người thông qua việc đảm bảo quyền làm chủ, cơ hội bình đẳng và phát triển sản xuất hiện đại dựa trên khoa học và công nghệ. CNXH mang lại một thế giới công bằng, hòa bình, và ổn định hơn, đặt con người làm trung tâm phát triển. Tại Việt Nam, CNXH không chỉ là lý tưởng mà còn là định hướng chính cho các chính sách phát triển, phù hợp với thực tiễn đất nước."
          />
          <FeatureCard
            icon={Users}
            title="2. Sự hình thành tư tưởng xã hội chủ nghĩa"
            description={
              "Chủ nghĩa xã hội không tưởng được hình thành qua các ý tưởng lý tưởng hóa như xã hội không bất công của Thomas More, cộng đồng tập thể của Charles Fourier, và thí nghiệm xã hội của Robert Owen, nhưng đều thiếu cơ sở khoa học và không giải quyết được mâu thuẫn giai cấp. Karl Marx và Friedrich Engels đã chuyển hóa chủ nghĩa xã hội thành lý luận khoa học, khẳng định lịch sử là đấu tranh giai cấp và sự phát triển xã hội phụ thuộc vào lực lượng sản xuất và quan hệ sản xuất. Họ đưa ra phương pháp nghiên cứu và thực tiễn nhằm giải phóng con người khỏi bóc lột và bất công."
            }
          />
          <FeatureCard
            icon={Target}
            title="3. CNXH và sự thay thế chủ nghĩa tư bản"
            description="Chủ nghĩa tư bản (CNTB) tồn tại nhiều hạn chế như bất bình đẳng giàu nghèo, mâu thuẫn giai cấp, khủng hoảng kinh tế, và tập trung quyền lực kinh tế, dẫn đến bất công xã hội. Trong khi đó, chủ nghĩa xã hội (CNXH) là một bước tiến lịch sử, được xây dựng trên cơ sở khoa học nhằm xóa bỏ bóc lột, tái phân phối quyền lực về tay nhân dân và phát triển bền vững. CNXH hướng tới một xã hội công bằng, dân chủ và văn minh, mang lại khát vọng về một thế giới tốt đẹp hơn cho nhân loại."
          />
        </div>
      </StorySection>

      {/* Section 2: Giai cấp công nhân hiện nay */}
      <StorySection
        id="section2"
        bgImage="https://res.cloudinary.com/monkeysuper/image/upload/v1736882117/yjfpga7boqm6h2n8b6vc.jpg"
        title="II. Những đặc trưng bản chất của chủ nghĩa xã hội"
      >
        <div className="max-w-6xl mx-auto px-4">
          <TimelineItem
            title="Sở hữu công cộng về tư liệu sản xuất"
            description="Tư liệu sản xuất như đất đai, tài nguyên thiên nhiên, nhà máy, các phương tiện sản xuất khác... được xem là tài sản chung của toàn xã hội hoặc của tập thể, thay vì thuộc sở hữu cá nhân. Đây là đặc trưng của chủ nghĩa xã hội (CNXH), nhằm đảm bảo rằng mọi nguồn lực được quản lý và khai thác vì lợi ích chung."
            isRight={false}
            image="https://res.cloudinary.com/monkeysuper/image/upload/v1736880011/zunjsqex3sq0xmaz1lro.jpg"
          />
          <TimelineItem
            title="Kế hoạch hóa nền kinh tế"
            description="Trong CNXH, nền kinh tế không bị chi phối bởi quy luật thị trường tự do mà phát triển dựa trên các kế hoạch tập trung, do nhà nước đề ra. Kế hoạch hóa nhấn mạnh việc phân bổ nguồn lực hiệu quả, hướng đến mục tiêu phát triển bền vững."
            isRight={true}
            image="https://res.cloudinary.com/monkeysuper/image/upload/v1736880084/oztumctjpbdkgrbajmtq.jpg"
          />
          <TimelineItem
            title="Xóa bỏ giai cấp và bất công xã hội"
            description="CNXH hướng đến một xã hội không còn sự đối kháng giữa các giai cấp. Mỗi người đều có quyền được tiếp cận và tham gia vào các nguồn lực phát triển, không bị bóc lột hay ép buộc."
            isRight={false}
            image="https://res.cloudinary.com/monkeysuper/image/upload/v1736880149/eu8uf6nfjf29i43onyqb.jpg"
          />
          <TimelineItem
            title="Phân phối theo lao động"
            description="Chủ nghĩa xã hội đặt ra nguyên tắc -Làm theo năng lực, hưởng theo lao động-. Điều này có nghĩa là phần thưởng và quyền lợi cá nhân được xác định dựa trên mức độ đóng góp của mỗi người trong quá trình lao động, không phụ thuộc vào tài sản hoặc vị trí xã hội sẵn có."
            isRight={true}
            image="https://res.cloudinary.com/monkeysuper/image/upload/v1736880249/wxeeya2dgeouz9m0uv3o.jpg"
          />
          <TimelineItem
            title="Nhà nước của dân, do dân và vì dân"
            description="Nhà nước xã hội chủ nghĩa không còn là công cụ duy trì quyền lực của một giai cấp cụ thể mà trở thành tổ chức đại diện cho lợi ích của toàn dân. Quyền lực nhà nước thuộc về nhân dân, thông qua các cơ chế dân chủ và pháp quyền."
            isRight={false}
            image="https://res.cloudinary.com/monkeysuper/image/upload/v1736886248/ava5wli3pskxti3yxx9l.jpg"
          />
          <TimelineItem
            title="Phát triển toàn diện con người"
            description="Chủ nghĩa xã hội không chỉ tập trung vào tăng trưởng kinh tế mà còn hướng tới việc phát triển toàn diện con người. Điều này bao gồm các khía cạnh: trí tuệ, đạo đức, sức khỏe và tinh thần."
            isRight={true}
            image="https://res.cloudinary.com/monkeysuper/image/upload/v1736881950/g30ofcho3gwbcixfamn2.jpg"
          />
          <TimelineItem
            title="Quan hệ quốc tế hòa bình, đoàn kết"
            description="Chủ nghĩa xã hội hướng đến mục tiêu xây dựng một thế giới không có sự áp đặt, xâm lược hay bóc lột giữa các quốc gia. Các nước theo đường lối xã hội chủ nghĩa luôn đề cao hợp tác bình đẳng, tôn trọng chủ quyền và văn hóa của nhau."
            isRight={false}
            image="https://res.cloudinary.com/monkeysuper/image/upload/v1736882017/enbqvamavst504hp3hgl.jpg"
          />
        </div>
      </StorySection>

      {/* Section 3: Sứ mệnh lịch sử của GCCN Việt Nam */}
      <StorySection
        id="section3"
        bgImage={section3}
        title="III. Thời kỳ quá độ lên chủ nghĩa xã hội tại Việt Nam"
      >
        <FloatingOrbsFeatures
          features={[
            {
              icon: Briefcase,
              title: "Quan điểm của Đảng Cộng sản Việt Nam",
              description:
                "Đảng Cộng sản Việt Nam lựa chọn con đường xây dựng chủ nghĩa xã hội (CNXH) dựa trên tư tưởng Hồ Chí Minh và nguyên lý của chủ nghĩa Marx-Lenin, nhấn mạnh sự sáng tạo và phù hợp với điều kiện thực tiễn đất nước. CNXH tại Việt Nam không chỉ chú trọng phát triển kinh tế mà còn đảm bảo công bằng xã hội, nâng cao đời sống nhân dân, và giảm phân hóa giai cấp. Đảng đề cao vai trò lãnh đạo của mình trong việc định hướng, điều chỉnh, và thúc đẩy sự phát triển kinh tế - xã hội, hướng đến mục tiêu xây dựng một xã hội công bằng, dân chủ, văn minh, và phồn vinh.",
            },
            {
              icon: Share2,
              title: "Những đặc điểm của thời kỳ quá độ",
              description:
                "Trong thời kỳ quá độ lên chủ nghĩa xã hội, Việt Nam phát triển đồng thời nhiều thành phần kinh tế, gồm kinh tế nhà nước giữ vai trò chủ đạo, kinh tế tư nhân thúc đẩy việc làm và nâng cao năng lực cạnh tranh, cùng kinh tế hợp tác hỗ trợ liên kết và sử dụng hiệu quả nguồn lực. Đây là bước đi sáng tạo để chuyển từ kinh tế kế hoạch hóa sang kinh tế thị trường, phù hợp thực tiễn. Đồng thời, các giá trị kinh tế, văn hóa và xã hội cũ vẫn song song tồn tại với yếu tố mới, dẫn đến sự đan xen và mâu thuẫn. Đảng Cộng sản Việt Nam đã áp dụng các chính sách linh hoạt để xóa bỏ các yếu tố lạc hậu, tạo điều kiện phát triển cho những giá trị mới.",
            },
            {
              icon: TrendingUp,
              title: "Thành tựu và thách thức",
              description:
                "Trong giai đoạn quá độ lên chủ nghĩa xã hội, Việt Nam đạt được nhiều thành tựu như tăng trưởng kinh tế ổn định, giảm nghèo, nâng cao chất lượng sống, và phát triển cơ sở hạ tầng, tạo tiền đề cho sự phát triển bền vững. Tuy nhiên, đất nước vẫn đối mặt với thách thức như cạnh tranh toàn cầu, khoảng cách giàu nghèo gia tăng, và bảo vệ bản sắc văn hóa trong bối cảnh hội nhập quốc tế. Để xây dựng xã hội chủ nghĩa vững mạnh, Việt Nam cần tiếp tục nỗ lực khắc phục khó khăn và phát huy những thành tựu đã đạt được.",
            },
          ]}
        />
      </StorySection>

      {/* Section 4: Thảo luận */}
      <StorySection
        id="section4"
        bgImage="https://res.cloudinary.com/monkeysuper/image/upload/v1736883854/dgb7kvphooeypifbhguk.jpg"
        title="Kết Luận"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* 3. Kết luận */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
              <div className="text-white/80 space-y-4">
                <p>
                  Chủ nghĩa xã hội (CNXH) là mô hình tổ chức xã hội nhằm xây
                  dựng một xã hội công bằng, không phân biệt giai cấp và không
                  có bóc lột, đặt con người làm trung tâm của mọi hoạt động.
                  Việt Nam đã chọn con đường đi lên CNXH từ những năm 1980s, đạt
                  được nhiều thành tựu như tăng trưởng kinh tế ổn định, giảm
                  nghèo, nâng cao chất lượng sống và hội nhập quốc tế, đồng thời
                  bảo vệ bản sắc văn hóa dân tộc. Tuy nhiên, Việt Nam vẫn đối
                  mặt với thách thức về khoảng cách giàu nghèo, mâu thuẫn trong
                  chuyển đổi xã hội và tác động từ toàn cầu hóa. Với sự nỗ lực
                  của Chính phủ, Đảng Cộng sản và nhân dân, Việt Nam tiếp tục
                  kiên định trên con đường CNXH, phấn đấu xây dựng một xã hội
                  phồn vinh, dân chủ, văn minh, khẳng định vị thế trên trường
                  quốc tế.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </StorySection>

      {/* Section 4: QC */}
      <StorySection
        id="section5"
        bgImage="https://res.cloudinary.com/monkeysuper/image/upload/v1736884591/gcsyqquxbp4rh5njidqj.jpg"
        title="Trả lời câu hỏi phản biện:"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* 3. Kết luận */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
              <div className="text-white/80 space-y-4">
                <div className="p-6 space-y-6">
                  <div className="bg-white/10 backdrop-blur-md shadow-md p-4 rounded-md">
                    <h2 className="text-lg text-white font-semibold ">
                      1. Hệ thống phúc lợi xã hội
                    </h2>
                    <p className="text-white/70">
                      Hướng đến xã hội công bằng với bảo hiểm toàn dân, trợ cấp
                      cho người yếu thế, đảm bảo không ai bị bỏ lại phía sau.
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md shadow-md p-4 rounded-md">
                    <h2 className="text-lg font-semibold text-white">
                      2. Y tế công cộng hiện đại
                    </h2>
                    <p className="text-white/70">
                      Chăm sóc sức khỏe miễn phí hoặc chi phí thấp, chú trọng
                      phòng bệnh và ứng dụng công nghệ trong y tế.
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md shadow-md p-4 rounded-md">
                    <h2 className="text-lg font-semibold text-white">
                      3. Công bằng xã hội
                    </h2>
                    <p className="text-white/70">
                      Tăng thuế người giàu, hỗ trợ giáo dục và y tế miễn phí,
                      giảm bất bình đẳng xã hội.
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md shadow-md p-4 rounded-md">
                    <h2 className="text-lg font-semibold text-white">
                      4. Giáo dục ý thức xã hội
                    </h2>
                    <p className="text-white/70">
                      Giáo dục tinh thần trách nhiệm xã hội, yêu nước, và đào
                      tạo nguồn nhân lực chất lượng cao.
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md shadow-md p-4 rounded-md">
                    <h2 className="text-lg font-semibold text-white">
                      5. Quản lý kinh tế minh bạch
                    </h2>
                    <p className="text-white/70">
                      Minh bạch tài chính công và áp dụng công nghệ để quản lý,
                      phát triển kinh tế hiệu quả.
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md shadow-md p-4 rounded-md">
                    <h2 className="text-lg font-semibold text-white">
                      6. Phát triển bền vững
                    </h2>
                    <p className="text-white/70">
                      Đầu tư năng lượng tái tạo, bảo vệ môi trường và phát triển
                      mô hình kinh tế cộng đồng.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </StorySection>
    </div>
  );
};

export default StorytellingPage;
