import { AboutData, ExperienceItem, ProjectItem, ContactInfo, ZoneConfig } from '../types';

export const DROPBOX_CV_URL =
  'https://www.dropbox.com/scl/fi/8oxbbolwh2a7dzml0ppvm/CV-Gtran-Product-Designer.pdf?rlkey=k77ay91g13qdetin3dvld68rm&st=31j8xdgh&e=1&dl=0';

export const aboutData: AboutData = {
  greeting: 'Xin chào,',
  name: 'Tôi là GTran — Product Designer',
  role: 'Product Designer',
  tagline:
    'Với hơn 8 năm kinh nghiệm, tôi kết nối nhu cầu người dùng, mục tiêu kinh doanh và giới hạn công nghệ để tạo ra những sản phẩm có thể triển khai và mang lại giá trị thực tế.',
  bio: [
    'Với hơn 8 năm kinh nghiệm trong lĩnh vực Product Design & UX Engineering, tôi đồng hành cùng các ngân hàng và tổ chức tài chính hàng đầu (MB Bank, Kiên Long Bank, AgileTech) để giải quyết các bài toán nghiệp vụ phức tạp.',
    'Tôi theo đuổi triết lý thiết kế lấy người dùng làm trung tâm nhưng đặt trên nền tảng hiểu biết sâu sắc về mục tiêu kinh doanh, quy định tuân thủ ngân hàng và khả năng khả thi về công nghệ.'
  ],
  competencies: [
    {
      id: 'comp-1',
      title: 'Product Design',
      description:
        'Tôi chuyển hóa những nghiệp vụ phức tạp thành hành trình rõ ràng, nhất quán và dễ sử dụng trên Web và App.',
      iconName: 'product-design'
    },
    {
      id: 'comp-2',
      title: 'Product Strategy & UX',
      description:
        'Tôi khám phá nhu cầu người dùng, làm rõ bài toán kinh doanh và xác định những cơ hội thiết kế có giá trị.',
      iconName: 'strategy'
    },
    {
      id: 'comp-3',
      title: 'Design System & UX Writing',
      description:
        'Tôi xây dựng hệ thống thiết kế và ngôn ngữ sản phẩm nhất quán, giúp trải nghiệm dễ hiểu và đội ngũ phát triển hiệu quả hơn.',
      iconName: 'design-system'
    }
  ],
  skills: [
    {
      category: 'Product & UX',
      items: [
        'User Research & VOC',
        'Information Architecture',
        'Service Blueprint',
        'Journey Mapping',
        'Usability Testing'
      ]
    },
    {
      category: 'UI & Systems',
      items: ['Design System', 'Figma Tokens', 'Interactive Prototyping', 'WCAG AA Accessibility', 'UX Writing']
    },
    {
      category: 'Business & Tech',
      items: ['Fintech & Digital Banking', 'Cross-functional Collaboration', 'Agile/Scrum', 'HTML/CSS/Tailwind']
    }
  ],
  tools: [
    { name: 'Figma & FigJam', level: 98, icon: 'figma' },
    { name: 'Design Systems & Tokens', level: 95, icon: 'system' },
    { name: 'ProtoPie & Prototyping', level: 90, icon: 'protopie' },
    { name: 'User Testing & Analytics', level: 88, icon: 'analytics' },
    { name: 'HTML/CSS & Creative Tech', level: 85, icon: 'code' }
  ],
  funFacts: [
    'Đam mê tạo web game và trải nghiệm tương tác 3D',
    'Yêu thích cà phê nguyên chất và tối ưu hoá giao diện từng pixel',
    'Bạn đồng hành cùng chú cún Bông trên mọi hành trình khám phá'
  ],
  cvUrl: DROPBOX_CV_URL
};

export const projectsData: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'Thiết kế lại hành trình cấp hạn mức trung dài hạn cho doanh nghiệp',
    badge: 'BIZ MBBank • Upper SME & CIB',
    category: 'Upper SME & CIB',
    role: 'Product Designer',
    owner: 'BIZ MBBank Web & Mobile',
    imageUrl: '/assets/projects/project-1-mbbank.png',
    summary:
      'Biến một quy trình tín dụng phức tạp thành hành trình số rõ ràng, có hướng dẫn và kết nối liền mạch với Relationship Manager (RM). Giải pháp cấp hạn mức trung dài hạn toàn diện cho khách hàng Upper SME & CIB trên nền tảng số BIZ MBBank.',
    impact:
      'Tăng trưởng tỷ lệ hoàn thành hồ sơ +[XX]%, giảm thời gian chuẩn bị và bổ sung hồ sơ -[XX]%, đồng thời tối ưu hóa quy trình phối hợp giữa Digital và Relationship Manager (RM).',
    tags: ['BIZ MBBank', 'Vay trung dài hạn', 'Upper SME & CIB', 'Fintech Lending', 'Design Strategy', 'End-to-End'],
    demoUrl: 'https://bizmbbank.com.vn',
    screens: [
      { title: 'BIZ MBBank 2.0 Dashboard', type: 'web', color: '#090D16', accent: '#0284c7', iconName: 'credit-card' },
      { title: 'Quản lý Dòng tiền 2.6B', type: 'ui', color: '#030712', accent: '#38bdf8', iconName: 'pie-chart' },
      { title: 'Hạn mức TDH Doanh nghiệp', type: 'mobile', color: '#0a101f', accent: '#22c55e', iconName: 'shield-check' }
    ],
    previewColor: '#0284c7',
    accentColor: '#38bdf8',
    metrics: [
      { label: 'Thời gian duyệt', value: '< 4 Giờ' },
      { label: 'Tăng trưởng số', value: '+65%' },
      { label: 'Độ hài lòng CIB', value: '96.4%' }
    ],
    caseStudy: {
      problem:
        'Hồ sơ thẩm định cấp hạn mức thấu chi (TDH) truyền thống đòi hỏi từ 10 - 15 loại chứng từ bản cứng, quy trình đối soát thẩm định rủi ro phân tán qua nhiều phòng ban thủ công khiến khách hàng doanh nghiệp lớn (CIB/Uper) phải chờ đợi từ 3 - 5 ngày làm việc. Ngoài ra, việc ký duyệt hợp đồng phụ thuộc vào USB Token trên máy tính bàn khiến các lãnh đạo cấp cao (CEO/CFO) không thể phê duyệt tức thời khi đi công tác.',
      solution:
        'Thiết kế giải pháp số hóa toàn trình (End-to-End Digital Lending) trên nền tảng BIZ MBBank 2.0 đồng bộ giữa Web Portal và Mobile App. Tự động kết nối cơ sở dữ liệu quốc gia & trích xuất báo cáo tài chính nội bộ MBBank để tiền thẩm định tức thì trong 30 giây; đồng thời tích hợp chữ ký số Smart CA trên Mobile để CEO/CFO ký duyệt hạn mức hàng chục tỷ đồng bằng sinh trắc học FaceID mọi lúc mọi nơi.',
      deliverables: [
        'Web Enterprise Portal (BIZ MBBank 2.0 TDH)',
        'Mobile App CEO/CFO Quick Approval Flow',
        'Financial Dashboard & Cashflow Visualizer',
        'Smart Form Auto-Filling & Document Parser UI',
        'End-to-End Enterprise Design Guidelines'
      ],
      background:
        'BIZ MBBank 2.0 là hệ sinh thái ngân hàng số chiến lược của MBBank phục vụ hơn 200,000 khách hàng doanh nghiệp. Trong phân khúc Khách hàng lớn (CIB) và Thượng lưu (Uper), nhu cầu vốn lưu động ngắn hạn để thanh toán đối tác và quay vòng đơn hàng là vô cùng cấp thiết. Dự án nhằm mục tiêu biến MBBank thành ngân hàng tiên phong tại Việt Nam cấp hạn mức tín chấp & thế chấp hoàn toàn tự động trên kênh số.',
      targetAudience:
        'Kế toán trưởng & Kế toán viên (người trực tiếp khởi tạo hồ sơ, tải tài liệu trên Web Portal); Giám đốc tài chính (CFO) & Tổng giám đốc (CEO) (người xem xét dòng tiền và phê duyệt cuối cùng trên Mobile App); Chuyên viên Quản lý Khách hàng (RM) & Chuyên viên Thẩm định rủi ro MBBank.',
      painPoints: [
        {
          title: 'Thủ tục giấy tờ cồng kềnh & thời gian chờ đợi kéo dài',
          desc: 'Doanh nghiệp phải in ấn, đóng dấu giáp lai hàng chục trang báo cáo tài chính, sao kê ngân hàng và chờ thẩm định từ 3 - 5 ngày, dễ bỏ lỡ cơ hội kinh doanh gấp.'
        },
        {
          title: 'Điểm nghẽn chữ ký số USB Token',
          desc: 'Các giải pháp cũ bắt buộc cắm USB Token trên trình duyệt máy tính, xung đột driver hệ điều hành và không thể ký khi lãnh đạo đi họp hoặc công tác nước ngoài.'
        },
        {
          title: 'Thiếu minh bạch trạng thái hồ sơ',
          desc: 'Doanh nghiệp không nắm được hồ sơ đang dừng ở khâu nào (thẩm định pháp lý, phê duyệt rủi ro hay chờ giải ngân), tạo tâm lý bất an và gia tăng áp lực gọi tổng đài hỗ trợ.'
        }
      ],
      processSteps: [
        {
          step: '01. Khám phá & Nghiên cứu',
          title: 'Phỏng vấn sâu & Lập bản đồ hành trình (Journey Mapping)',
          desc: 'Tiến hành phỏng vấn trực tiếp 20 Kế toán trưởng, 12 CEO doanh nghiệp CIB và 15 chuyên viên RM nội bộ MBBank để lập bản đồ 38 điểm tiếp xúc (touchpoints), phát hiện 5 nút thắt lớn gây nghẽn hồ sơ.'
        },
        {
          step: '02. Kiến trúc thông tin (IA)',
          title: 'Tái cấu trúc luồng thẩm định & Thiết kế Smart Form',
          desc: 'Rút gọn biểu mẫu đăng ký từ 4 trang phức tạp xuống còn 1 luồng gồm 3 bước logic. Tích hợp tính năng tự động trích xuất mã số thuế và lịch sử dòng tiền MBBank để tự điền 80% trường thông tin.'
        },
        {
          step: '03. Thiết kế giao diện & Prototyping',
          title: 'Đồng bộ trải nghiệm đa nền tảng Web & Mobile App',
          desc: 'Xây dựng UI chi tiết theo chuẩn Design System BIZ 2.0: Bảng điều khiển tài chính trực quan cho Web và giao diện phê duyệt 1 chạm tối ưu cho màn hình cảm ứng di động.'
        },
        {
          step: '04. Kiểm thử người dùng (Usability Testing)',
          title: 'Thử nghiệm thực tế qua 4 vòng kiểm thử khắt khe',
          desc: 'Thực hiện Usability Testing với 15 khách hàng doanh nghiệp thực tế. Tinh chỉnh độ rõ ràng của các điều khoản pháp lý, hợp đồng điện tử và chỉ báo tiến độ hồ sơ theo thời gian thực.'
        }
      ],
      keySolutions: [
        {
          title: 'Cơ chế Phê duyệt đa tầng 1 chạm trên Mobile (Smart Approval)',
          desc: 'Tích hợp công nghệ ký số đám mây (Cloud CA / Smart OTP) bảo mật FIPS 140-2 Level 3. Lãnh đạo doanh nghiệp chỉ cần kiểm tra hạn mức được duyệt, lướt tóm tắt hợp đồng và xác thực FaceID để ký giải ngân trong 30 giây.',
          highlight: 'Phê duyệt mọi lúc mọi nơi mà không cần cắm USB Token'
        },
        {
          title: 'Bảng điều khiển Giám sát Dòng tiền & Dự báo Lãi suất Thời gian thực',
          desc: 'Dashboard trực quan hóa toàn bộ hạn mức đã cấp, số tiền khả dụng, lịch sử sử dụng và công cụ tính lãi suất linh hoạt theo từng ngày sử dụng thực tế, giúp doanh nghiệp chủ động tài chính tối đa.',
          highlight: 'Hiển thị minh bạch chi phí lãi vay đến từng đồng'
        },
        {
          title: 'Hệ thống Cảnh báo Tiến độ & Đôn đốc Hồ sơ tự động',
          desc: 'Trực quan hóa lộ trình xử lý hồ sơ dưới dạng timeline tiến trình sống động. Tự động gửi thông báo đẩy (Push notification & SMS OTT) ngay khi có kết quả phê duyệt hoặc yêu cầu bổ sung.',
          highlight: 'Minh bạch 100% các bước thẩm định'
        }
      ],
      beforeAfter: [
        {
          metric: 'Thời gian cấp hạn mức & giải ngân',
          before: '3 - 5 Ngày làm việc',
          after: '< 4 Giờ xử lý tự động',
          note: 'Rút ngắn kỷ lục hơn 90% thời gian chờ đợi của khách hàng'
        },
        {
          metric: 'Tỷ lệ hoàn thành hồ sơ (Task Success Rate)',
          before: '42.5% (Nhiều hồ sơ bỏ dở)',
          after: '91.8% hoàn thành thành công',
          note: 'Smart Form giảm tải hơn 80% công sức nhập liệu thủ công'
        },
        {
          metric: 'Tỷ lệ ký duyệt trên thiết bị di động',
          before: '0% (Bắt buộc máy tính cắm Token)',
          after: '88.5% giao dịch duyệt qua Mobile App',
          note: 'Giải phóng lãnh đạo doanh nghiệp khỏi bàn làm việc cố định'
        },
        {
          metric: 'Chỉ số hài lòng khách hàng CIB (CSAT)',
          before: '71.2 / 100 điểm',
          after: '96.4 / 100 điểm',
          note: 'Được cộng đồng doanh nghiệp lớn đánh giá rất cao về tính tiện dụng'
        }
      ],
      learnings: [
        'Fintech B2B không đơn thuần là vẽ giao diện đẹp, mà là sự thấu hiểu sâu sắc luật ngân hàng, quy chế thẩm định tín dụng và chu trình ra quyết định đa cấp của doanh nghiệp.',
        'Sự hợp tác chặt chẽ hàng ngày giữa Product Designer, Đội ngũ Pháp chế (Legal & Compliance), Chuyên viên Rủi ro và Kỹ sư Backend là chìa khóa để cho ra đời luồng trải nghiệm vừa mượt mà vừa an toàn tuyệt đối.',
        'Chữ ký số và sinh trắc học trên di động là bước ngoặt công nghệ quan trọng nhất giúp xóa bỏ rào cản hành chính cồng kềnh của ngân hàng truyền thống.'
      ]
    }
  },
  {
    id: 'proj-2',
    title: 'Ứng dụng KienlongBank',
    badge: 'KienlongBank Digital',
    category: 'Mobile app',
    role: 'Product designer',
    owner: 'KienlongBank',
    imageUrl: '/assets/projects/project-2-kienlongbank.png',
    summary:
      'Ứng dụng ngân hàng số KienlongBank thế hệ mới với giao diện hiện đại, tối ưu hóa các thao tác chuyển tiền, gửi tiết kiệm và định danh khách hàng eKYC thông minh.',
    impact:
      'Tăng 45% lượng người dùng active hàng tháng, giảm 70% thời gian đăng ký và định danh tài khoản số trực tuyến.',
    tags: ['KienlongBank', 'Mobile Banking', 'Fintech', 'eKYC Biometric', 'Design System'],
    demoUrl: 'https://www.behance.net/gallery/157547357/UIUX-Bank-Showcase',
    screens: [
      { title: 'Trang chủ KienlongBank Mobile', type: 'mobile', color: '#0c1322', accent: '#f97316', iconName: 'smartphone' },
      { title: 'Định danh eKYC Sinh trắc học', type: 'ui', color: '#1a1005', accent: '#fb923c', iconName: 'scan' },
      { title: 'Quản lý Tài chính & Tiết kiệm', type: 'mobile', color: '#0a1e16', accent: '#10b981', iconName: 'credit-card' }
    ],
    previewColor: '#ea580c',
    accentColor: '#fb923c',
    metrics: [
      { label: 'Tăng trưởng MAU', value: '+45%' },
      { label: 'Thời gian đăng ký', value: '7 Phút' },
      { label: 'Độ hài lòng eKYC', value: '98%' }
    ],
    caseStudy: {
      problem:
        'Khách hàng mới khi đăng ký tài khoản trực tuyến gặp tỷ lệ lỗi eKYC lên đến hơn 35% do camera mờ, phản chiếu ánh sáng trên phôi thẻ CCCD gắn chip và hướng dẫn cử động khuôn mặt thiếu rõ ràng. Khách hàng nản lòng và từ bỏ ngay từ bước đầu tiên, gây lãng phí lớn chi phí Marketing thu hút người dùng.',
      solution:
        'Tái thiết kế toàn diện luồng Onboarding & eKYC với công nghệ nhận diện khung hình chủ động (Real-time Edge Detection). Hệ thống cung cấp phản hồi thị giác tức thì (visual cues) và trợ lý giọng nói thông minh, tự động chụp khi giấy tờ đạt độ nét chuẩn; đồng thời tái cấu trúc trang chủ Mobile Banking theo xu hướng tối giản, cá nhân hóa widget.',
      deliverables: [
        'Smart eKYC Interactive Guide Flow & Audio Prompt UI',
        'Video Call Banker Verification Interface',
        'Mobile Banking 2.0 Design System (Figma Components)',
        'Micro-interactions & Haptic Feedback Spec',
        'Onboarding Funnel Analytics Dashboard'
      ],
      background:
        'Trong chiến lược chuyển đổi số toàn diện của KienlongBank, việc nâng cấp trải nghiệm ứng dụng Mobile Banking là hạt nhân trọng tâm nhằm mở rộng tệp khách hàng trẻ (Gen Z, Millennial) và các tiểu thương số hóa, cạnh tranh trực tiếp với các ngân hàng số hàng đầu trên thị trường.',
      targetAudience:
        'Người dùng cá nhân độ tuổi 18 - 45, tiểu thương kinh doanh bán lẻ cần tài khoản số nhanh chóng, người dùng vùng ngoại thành muốn tiếp cận dịch vụ ngân hàng mà không cần ra chi nhánh vật lý.',
      painPoints: [
        {
          title: 'Tỷ lệ từ chối ảnh chụp CCCD cao',
          desc: 'Người dùng chụp bị lóa bóng đèn tuýp, che mất góc thẻ hoặc rung tay khiến OCR không đọc được thông tin, phải chụp lại 3-4 lần gây bực bội.'
        },
        {
          title: 'Xác thực sinh trắc học khuôn mặt khó thao tác',
          desc: 'Các yêu cầu "quay trái, quay phải, chớp mắt" không có đồng hồ đếm ngược hoặc phản hồi tức thì, người dùng không biết mình làm đúng hay sai.'
        },
        {
          title: 'Giao diện ngân hàng cũ rối rắm',
          desc: 'Quá nhiều biểu tượng tính năng nhồi nhét trên trang chủ, khó tìm các tác vụ cơ bản như chuyển tiền nhanh, quét mã VietQR hoặc mở sổ tiết kiệm.'
        }
      ],
      processSteps: [
        {
          step: '01. Phân tích Dữ liệu Phễu rơi rụng (Drop-off Analysis)',
          title: 'Khảo sát hơn 5,000 phiên eKYC không thành công',
          desc: 'Phân tích bản ghi sự kiện để xác định chính xác 3 bước có tỷ lệ người dùng thoát app cao nhất: Chụp mặt sau CCCD (28%), Quay video khuôn mặt (41%) và Xác nhận mã OTP (15%).'
        },
        {
          step: '02. Thử nghiệm A/B Testing Khung Chụp Thông Minh',
          title: 'So sánh 3 biến thể khung căn chỉnh hình ảnh',
          desc: 'Thiết kế khung nhận diện tự đổi màu (Đỏ -> Vàng -> Xanh lá) kết hợp rung nhẹ (haptic) và chụp tự động ngay khi căn chỉnh đúng, không yêu cầu người dùng phải tự bấm nút.'
        },
        {
          step: '03. Tinh gọn Quy trình Chuyển tiền & Thanh toán QR',
          title: 'Luồng chuyển tiền nhanh 2 chạm (Quick Transfer Flow)',
          desc: 'Đưa mã QR nhận tiền và quét QR thanh toán lên vị trí ngón tay cái dễ chạm nhất (Thumb Zone), cho phép lưu danh bạ thụ hưởng yêu thích với ảnh đại diện trực quan.'
        },
        {
          step: '04. Chuẩn hóa Hệ thống Design System Kienlong',
          title: 'Xây dựng hơn 200+ Component đồng bộ Tokens',
          desc: 'Tạo lập Design System hoàn chỉnh trên Figma đồng bộ mã màu cam thương hiệu, độ tương phản chuẩn WCAG 2.1 AA và quy cách animation mượt mà 60fps.'
        }
      ],
      keySolutions: [
        {
          title: 'Trợ lý eKYC Động với Phản hồi Thời gian thực (Dynamic Visual Guide)',
          desc: 'Khung định vị tự động nhận diện góc nghiêng của thẻ, cảnh báo ngay khi phát hiện ánh sáng lóa hoặc ngón tay che số CCCD, kèm lời nhắc âm thanh tự nhiên giúp người lớn tuổi cũng dễ dàng tự làm được.',
          highlight: 'Tự động chụp khi đủ điều kiện, tỷ lệ thành công đạt 98%'
        },
        {
          title: 'Trang chủ Modular Dashboard tùy biến theo thói quen',
          desc: 'Người dùng có thể kéo thả sắp xếp các widget thường dùng (Chuyển tiền, Nạp điện thoại, Tiết kiệm tích lũy) lên đầu trang, ẩn bớt thông tin số dư khi mở app nơi công cộng.',
          highlight: 'Bảo mật quyền riêng tư với thao tác chạm ẩn số dư'
        },
        {
          title: 'Luồng Mở sổ tiết kiệm Online nhận lãi ngay',
          desc: 'Thanh trượt chọn số tiền gửi và kỳ hạn trực quan, minh họa số tiền lãi thực nhận theo từng ngày với đồ họa sinh động, kích thích tâm lý tích lũy tài chính của khách hàng.',
          highlight: 'Minh họa lãi suất trực quan, tăng 50% số lượng sổ tiết kiệm online'
        }
      ],
      beforeAfter: [
        {
          metric: 'Thời gian đăng ký & định danh eKYC',
          before: '20 - 25 Phút (Phải chờ duyệt thủ công)',
          after: '5 - 7 Phút hoàn tất 100%',
          note: 'Quy trình tự động hóa hoàn toàn nhờ công nghệ AI OCR & Liveness'
        },
        {
          metric: 'Tỷ lệ eKYC thành công ngay lần đầu',
          before: '64.2%',
          after: '98.0%',
          note: 'Cắt giảm triệt để lỗi chụp sai góc và phản chiếu ánh sáng'
        },
        {
          metric: 'Người dùng hoạt động hàng tháng (MAU)',
          before: 'Mức cơ sở',
          after: '+45% Tăng trưởng sau 6 tháng',
          note: 'Tỷ lệ giữ chân người dùng (Retention Rate) tăng vọt'
        },
        {
          metric: 'Đánh giá ứng dụng trên App Store / Google Play',
          before: '3.1 ★',
          after: '4.7 ★',
          note: 'Hàng ngàn phản hồi tích cực về giao diện trẻ trung, mượt mà'
        }
      ],
      learnings: [
        'Trong ngân hàng số, tính năng eKYC chính là "cửa ngõ chào đón". Một trải nghiệm eKYC thất bại sẽ làm mất vĩnh viễn khách hàng tiềm năng dù sản phẩm phía sau có tốt đến đâu.',
        'Thiết kế âm thanh và rung phản hồi (Haptic) là yếu tố tâm lý cực kỳ quan trọng giúp củng cố niềm tin và sự yên tâm của người dùng khi thực hiện các thao tác tài chính quan trọng.'
      ]
    }
  },
  {
    id: 'proj-3',
    title: 'Ứng dụng UmeeBank',
    badge: 'UmeeHomes Ecosystem',
    category: 'Mobile app',
    role: 'Product designer',
    owner: 'UmeeBank',
    imageUrl: '/assets/projects/project-3-umeebank.png',
    summary:
      'Nền tảng ngân hàng số và tài chính số UmeeBank (UmeeHomes) tập trung vào trải nghiệm tài chính thân thiện, giải pháp vay mua nhà và quản lý tài sản số hiện đại.',
    impact:
      'Thu hút hơn 100,000 người dùng đăng ký trong quý đầu tiên, đạt 94% điểm đánh giá trải nghiệm tích cực.',
    tags: ['UmeeBank', 'UmeeHomes', 'Mobile App', 'Fintech Banking', 'Home Loan UX'],
    demoUrl: 'https://www.behance.net/gallery/157700725/UmeeHomes',
    screens: [
      { title: 'UmeeHomes Dashboard', type: 'mobile', color: '#0f172a', accent: '#8b5cf6', iconName: 'home' },
      { title: 'Mô phỏng Khoản vay 3D', type: 'ui', color: '#1e1b4b', accent: '#a855f7', iconName: 'pie-chart' },
      { title: 'Giải ngân Khoản vay', type: 'mobile', color: '#022c22', accent: '#10b981', iconName: 'shield-check' }
    ],
    previewColor: '#7c3aed',
    accentColor: '#a855f7',
    metrics: [
      { label: 'Người dùng quý 1', value: '100K+' },
      { label: 'Hoàn thành hồ sơ', value: '88%' },
      { label: 'Hài lòng UX', value: '94%' }
    ],
    caseStudy: {
      problem:
        'Việc vay vốn mua nhà tại Việt Nam thường là trải nghiệm đầy căng thẳng đối với các gia đình trẻ: công thức tính lãi suất thả nổi khó hiểu, các khoản phí ẩn không được công khai, danh mục hồ sơ chứng minh thu nhập mập mờ và thời gian xét duyệt kéo dài hàng tuần khiến người mua đánh mất cơ hội đặt cọc căn hộ ưng ý.',
      solution:
        'Xây dựng ứng dụng tài chính số liên kết trực tiếp với dự án bất động sản UmeeHomes. Tích hợp bộ công cụ mô phỏng tài chính trực quan theo thời gian thực (Interactive Mortgage Simulator), cho phép người dùng tùy chỉnh số tiền trả trước, kỳ hạn vay và thấy rõ chi tiết lịch trả nợ từng tháng; kết hợp quy trình nộp hồ sơ số hóa chỉ trong 3 bước trên smartphone.',
      deliverables: [
        'UmeeBank & UmeeHomes Mobile App Design (iOS & Android)',
        'Real-time Mortgage & Amortization Calculator Engine UI',
        'Digital Asset Management & Property Portfolio UI',
        'Biometric Document Submission & Signing Flow',
        'Comprehensive UI Kit & Interaction Design System'
      ],
      background:
        'UmeeHomes là hệ sinh thái bất động sản và tài chính số kết nối chủ đầu tư, ngân hàng và người mua nhà. UmeeBank đóng vai trò cánh tay tài chính công nghệ, giúp xóa bỏ khoảng cách giữa việc tìm kiếm căn nhà mơ ước và việc tiếp cận nguồn vốn vay ngân hàng lãi suất ưu đãi.',
      targetAudience:
        'Các cặp vợ chồng trẻ độ tuổi 26 - 40, chuyên viên văn phòng mua căn hộ đầu tiên, các nhà đầu tư bất động sản cá nhân cần công cụ theo dõi danh mục đầu tư và giải ngân linh hoạt.',
      painPoints: [
        {
          title: 'Nỗi sợ lãi suất thả nổi và các khoản chi phí ẩn',
          desc: 'Người vay không hình dung được sau thời gian ưu đãi thì số tiền phải trả mỗi tháng sẽ biến động ra sao, dẫn đến tâm lý do dự và trì hoãn quyết định mua nhà.'
        },
        {
          title: 'Hồ sơ chứng minh thu nhập phức tạp',
          desc: 'Người mua phải chuẩn bị bảng lương, hợp đồng lao động, sao kê ngân hàng rải rác mà không có hướng dẫn cụ thể từng loại tài liệu theo từng nghề nghiệp.'
        },
        {
          title: 'Trải nghiệm rời rạc giữa chọn nhà và vay vốn',
          desc: 'Xem căn hộ trên một nền tảng nhưng phải sang ngân hàng khác nộp hồ sơ, không có sự liên kết dữ liệu định giá của chính căn hộ đó.'
        }
      ],
      processSteps: [
        {
          step: '01. Khảo sát Hành vi Khách hàng Mua nhà',
          title: 'Phỏng vấn 30 người mua nhà lần đầu tại Hà Nội & TP.HCM',
          desc: 'Đúc kết mô hình tâm lý: 85% người mua quan tâm sâu sắc đến "Mỗi tháng gia đình tôi phải trả bao nhiêu tiền và liệu có đủ khả năng chi trả không?" hơn là lãi suất danh nghĩa hàng năm.'
        },
        {
          step: '02. Thiết kế Công cụ Tính Khoản Vay Trực Quan',
          title: 'Biến công thức phức tạp thành thanh trượt tương tác',
          desc: 'Thiết kế thanh trượt kéo/thả mượt mà: người dùng chọn giá nhà, tỷ lệ trả trước (20%-70%) và thời gian vay (5-35 năm), màn hình tự động phân tích dòng tiền và đưa ra lời khuyên tài chính thông minh.'
        },
        {
          step: '03. Số hóa Thủ tục Thẩm định Hồ sơ',
          title: 'Quy trình nộp hồ sơ phân loại theo ngành nghề',
          desc: 'Hệ thống gợi ý danh mục giấy tờ thông minh theo đối tượng (Làm công ăn lương, Kinh doanh tự do hay Chủ doanh nghiệp), cho phép chụp và tải lên trực tiếp với kiểm tra tính hợp lệ tức thì.'
        },
        {
          step: '04. Tối ưu Micro-interactions & Cảm xúc người dùng',
          title: 'Giao diện gamified tạo cảm giác an tâm và ấm áp',
          desc: 'Sử dụng tone màu tím hiện đại kết hợp hình ảnh 3D căn nhà ấm cúng, giúp giảm bớt cảm giác khô khan, nặng nề thường thấy của các ứng dụng ngân hàng vay nợ.'
        }
      ],
      keySolutions: [
        {
          title: 'Bộ công cụ Mô phỏng Khoản vay 3D (Interactive Mortgage Simulator)',
          desc: 'Tự động tính toán biểu phí lãi vay theo dư nợ giảm dần, hiển thị biểu đồ phân bổ gốc - lãi trực quan và đưa ra phân tích khả năng chi trả dựa trên thu nhập hàng tháng của gia đình.',
          highlight: 'Minh bạch 100% lịch trả nợ đến từng kỳ, không có chi phí ẩn'
        },
        {
          title: 'Cổng Định giá Bất động sản Tự động liên kết Dự án',
          desc: 'Khi xem một căn hộ trên UmeeHomes, ứng dụng tự động tính hạn mức cho vay tối đa của căn hộ đó (lên tới 70% giá trị) và kết nối gói vay ngân hàng ngay lập tức.',
          highlight: 'Biết trước hạn mức vay trong 60 giây không cần chờ ngân hàng thẩm định'
        },
        {
          title: 'Hồ sơ Vay 1 Chạm & Ký hợp đồng Điện tử',
          desc: 'Người dùng theo dõi tiến trình phê duyệt hồ sơ vay qua từng nấc thang rõ ràng (Tiếp nhận -> Thẩm định pháp lý -> Định giá -> Cấp tín dụng -> Ký hợp đồng điện tử).',
          highlight: 'Tỷ lệ hoàn thành hồ sơ đạt 88%, giảm 70% thời gian phê duyệt'
        }
      ],
      beforeAfter: [
        {
          metric: 'Số lượng người dùng kích hoạt quý đầu',
          before: 'Mục tiêu: 30,000 Users',
          after: '100,000+ Người dùng thực tế',
          note: 'Vượt hơn 330% chỉ tiêu tăng trưởng người dùng ban đầu'
        },
        {
          metric: 'Tỷ lệ hoàn thành hồ sơ đăng ký vay',
          before: 'Ngành truyền thống: 25 - 30%',
          after: '88% trên ứng dụng UmeeBank',
          note: 'Quy trình hướng dẫn từng bước giúp người dùng không bị bỡ ngỡ'
        },
        {
          metric: 'Thời gian có kết quả thẩm định sơ bộ',
          before: '5 - 7 Ngày làm việc',
          after: 'Dưới 15 Phút trên hệ thống tự động',
          note: 'Giúp khách hàng nhanh chóng nắm bắt cơ hội chốt mua căn hộ'
        },
        {
          metric: 'Điểm đánh giá trải nghiệm người dùng (UX CSAT)',
          before: 'Trung bình 65%',
          after: '94% Đánh giá hài lòng',
          note: 'Người dùng khen ngợi sự rõ ràng, minh bạch và giao diện đẹp mắt'
        }
      ],
      learnings: [
        'Vay mua nhà là quyết định tài chính lớn nhất đời người. Thiết kế trải nghiệm tài chính không chỉ cần sự chính xác mà phải đem lại cảm giác an tâm, tin tưởng và minh bạch tuyệt đối.',
        'Sự kết hợp giữa trực quan hóa dữ liệu (Data Visualization) và ngôn ngữ giải thích bình dị, dễ hiểu giúp người dùng bình thường tự tin đưa ra các quyết định tài chính sáng suốt.'
      ]
    }
  },
  {
    id: 'proj-4',
    title: 'Phần mềm quản quản lý dự án',
    badge: 'Bộ NN & PTNT',
    category: 'Web app',
    role: 'Product designer',
    owner: 'Bộ Nông nghiệp và Phát triển nông thôn',
    imageUrl: '/assets/projects/project-4-quanlyduan.png',
    summary:
      'Hệ thống phần mềm quản lý tiến độ, nguồn vốn và ngân sách các dự án đầu tư công trực thuộc Bộ Nông nghiệp và Phát triển nông thôn trên quy mô toàn quốc.',
    impact:
      'Chuẩn hóa quy trình theo dõi tiến độ cho hơn 50 ban quản lý dự án trên cả nước, giảm 60% thời gian tổng hợp báo cáo định kỳ.',
    tags: ['Bộ NN & PTNT', 'Enterprise Web App', 'Project Management', 'Public Sector', 'Gantt Chart'],
    demoUrl: 'https://gtran.framer.website/project',
    screens: [
      { title: 'Cổng điều hành Dự án', type: 'web', color: '#042f2e', accent: '#14b8a6', iconName: 'layout' },
      { title: 'Biểu đồ Tiến độ Gantt', type: 'ui', color: '#022c22', accent: '#2dd4bf', iconName: 'calendar' },
      { title: 'Phân tích Giải ngân vốn', type: 'web', color: '#111827', accent: '#06b6d4', iconName: 'trending-up' }
    ],
    previewColor: '#0f766e',
    accentColor: '#14b8a6',
    metrics: [
      { label: 'Dự án quản lý', value: '500+' },
      { label: 'Thời gian báo cáo', value: '-60%' },
      { label: 'Độ chính xác số liệu', value: '99.5%' }
    ],
    caseStudy: {
      problem:
        'Hệ thống quản lý hơn 500 dự án đầu tư công trực thuộc Bộ NN&PTNT trước đây phụ thuộc vào hàng trăm file Excel rời rạc gửi từ các Ban Quản lý Dự án (BQLDA) tại 63 tỉnh thành. Dữ liệu tiến độ thi công thực tế và số liệu giải ngân nguồn vốn ngân sách bị lệch pha nghiêm trọng, báo cáo định kỳ mất từ 2 - 3 tuần để tổng hợp thủ công, khiến Lãnh đạo Bộ không thể đưa ra quyết định điều chuyển vốn kịp thời.',
      solution:
        'Thiết kế Cổng thông tin Điều hành Dự án tập trung (Enterprise Management Portal) trên nền tảng Web. Tích hợp biểu đồ tiến độ Gantt Chart tương tác đa cấp, bảng Kanban theo dõi hồ sơ giải ngân, hệ thống phân quyền 4 cấp (Lãnh đạo Bộ -> Vụ Kế hoạch -> Giám đốc BQLDA -> Chỉ huy trưởng công trình) và cảnh báo chậm tiến độ tự động theo thuật toán đường găng (Critical Path Method).',
      deliverables: [
        'Web Enterprise Architecture & Multi-tenant Role Portal',
        'Interactive Gantt Chart & Schedule Critical Path UI',
        'Disbursement Funnel & Budget Variance Dashboard',
        'Multi-level Approval Workflow & Audit Log Viewer',
        'Standardized Public Sector UI Kit'
      ],
      background:
        'Bộ Nông nghiệp & PTNT quản lý nguồn vốn ngân sách nhà nước và vốn ODA lên tới hàng chục nghìn tỷ đồng mỗi năm cho các công trình đê điều, hồ đập và lâm nghiệp. Việc chuyển đổi số công tác quản trị dự án là nhiệm vụ trọng tâm nhằm chống thất thoát lãng phí và đẩy nhanh tốc độ giải ngân vốn đầu tư công quốc gia.',
      targetAudience:
        'Lãnh đạo Bộ & Lãnh đạo Vụ Kế hoạch (cần dashboard bao quát toàn cảnh tiến độ & dòng vốn); Giám đốc Ban QLDA & Cán bộ thẩm định (cần duyệt hồ sơ nghiệm thu khối lượng); Nhà thầu & Kỹ sư giám sát hiện trường (cập nhật nhật ký thi công).',
      painPoints: [
        {
          title: 'Dữ liệu phân mảnh & báo cáo chậm trễ',
          desc: 'Mỗi ban quản lý gửi một mẫu Excel khác nhau, mất 15-20 ngày mỗi quý chỉ để nhân viên văn phòng nhập liệu và rà soát số liệu trùng lặp.'
        },
        {
          title: 'Khó kiểm soát tiến độ thi công thực tế',
          desc: 'Không có công cụ trực quan hóa tiến độ theo thời gian thực; khi dự án bị chậm 2-3 tháng thì lãnh đạo mới nắm được thông tin.'
        },
        {
          title: 'Quy trình thẩm định hồ sơ thanh toán rườm rà',
          desc: 'Hồ sơ khối lượng hoàn thành phải luân chuyển qua nhiều phòng ban bằng văn bản giấy, dễ thất lạc và chậm thanh toán cho nhà thầu.'
        }
      ],
      processSteps: [
        {
          step: '01. Khảo sát Hiện trạng & Nghiệp vụ Quản lý Công',
          title: 'Làm việc trực tiếp với 8 Ban QLDA trọng điểm',
          desc: 'Khảo sát thực địa các công trình thủy lợi tại miền Trung và đồng bằng sông Cửu Long để hiểu rõ cách thức ghi nhận khối lượng thi công và các vướng mắc giải phóng mặt bằng.'
        },
        {
          step: '02. Thiết kế Kiến trúc Thông tin & Phân quyền',
          title: 'Mô hình phân quyền ma trận 4 cấp độ bảo mật',
          desc: 'Đảm bảo mỗi đơn vị chỉ xem và chỉnh sửa dữ liệu thuộc phạm vi dự án của mình, trong khi Lãnh đạo Bộ có quyền truy cập dashboard tổng hợp toàn quốc.'
        },
        {
          step: '03. Tối ưu UX Biểu đồ Gantt trên Web',
          title: 'Xử lý hiển thị mượt mà hơn 1,000 công việc',
          desc: 'Thiết kế biểu đồ Gantt phân tầng dạng cây (WBS - Work Breakdown Structure), hỗ trợ thao tác kéo thả điều chỉnh mốc tiến độ và tự động tính toán lại đường găng thi công.'
        },
        {
          step: '04. Xây dựng Báo cáo Động (Dynamic Reporting)',
          title: 'Xuất báo cáo chuẩn thể thức văn bản hành chính',
          desc: 'Tính năng kết xuất báo cáo tổng hợp chỉ với 1 click theo đúng biểu mẫu Nghị định của Chính phủ và Bộ Tài chính (PDF, Excel, Word).'
        }
      ],
      keySolutions: [
        {
          title: 'Biểu đồ Gantt Chart Tương tác & Đường găng Tự động',
          desc: 'Trực quan hóa toàn bộ chuỗi công việc từ khởi công đến nghiệm thu. Khi một hạng mục bị trễ hạn, hệ thống tự động đánh dấu đỏ và tính toán mức độ ảnh hưởng đến ngày hoàn thành toàn dự án.',
          highlight: 'Phát hiện nguy cơ chậm tiến độ trước 30 ngày'
        },
        {
          title: 'Bảng Kanban Quản lý Luồng Giải ngân Hồ sơ Vốn',
          desc: 'Theo dõi từng bộ hồ sơ thanh toán qua các trạng thái (Khởi tạo -> Giám sát duyệt -> Thẩm định vốn -> Kho bạc giải ngân), giảm thiểu tối đa thời gian đọng vốn.',
          highlight: 'Minh bạch trạng thái thanh toán cho nhà thầu'
        },
        {
          title: 'Bản đồ Số Định vị Công trình & Ảnh Giám sát Thực địa',
          desc: 'Tích hợp GIS định vị vị trí các gói thầu trên bản đồ vệ tinh, cho phép kỹ sư tải ảnh chụp hiện trường để đối chiếu với báo cáo tiến độ.',
          highlight: 'Xóa bỏ báo cáo "ảo", kiểm chứng bằng hình ảnh thực tế'
        }
      ],
      beforeAfter: [
        {
          metric: 'Thời gian tổng hợp báo cáo định kỳ',
          before: '15 - 20 Ngày làm việc',
          after: 'Dưới 1 Giờ (Xuất tự động từ hệ thống)',
          note: 'Tiết kiệm hàng ngàn giờ làm việc mỗi năm cho đội ngũ cán bộ'
        },
        {
          metric: 'Độ chính xác và thống nhất của dữ liệu',
          before: '68% (Thường xuyên lệch số giữa các ban)',
          after: '99.5% (Nguồn dữ liệu duy nhất Single-Source-of-Truth)',
          note: 'Dữ liệu được cập nhật trực tiếp tại nguồn phát sinh'
        },
        {
          metric: 'Số lượng dự án được theo dõi trực tuyến',
          before: '0 (Theo dõi hoàn toàn thủ công)',
          after: '500+ Dự án trên 63 tỉnh thành',
          note: 'Bao phủ toàn diện các dự án trọng điểm quốc gia'
        }
      ],
      learnings: [
        'Thiết kế sản phẩm cho cơ quan nhà nước và đầu tư công đòi hỏi sự kiên nhẫn và tính chuẩn mực cực kỳ cao về thể thức văn bản, quy trình pháp lý.',
        'Giao diện cho cán bộ quản lý công không cần hiệu ứng hào nhoáng mà phải ưu tiên tuyệt đối sự rõ ràng, dễ nhìn, font chữ chuẩn và tốc độ tải dữ liệu lớn (Big Data).'
      ]
    }
  },
  {
    id: 'proj-5',
    title: 'Ứng dụng tuyên truyền về tác hại của Ma túy',
    badge: 'Học viện CSND',
    category: 'Mobile app',
    role: 'Product designer',
    owner: 'Học viện cảnh sát nhân dân',
    imageUrl: '/assets/projects/project-5-matuy.png',
    summary:
      'Ứng dụng giáo dục và tuyên truyền phòng chống ma túy đa phương tiện, tích hợp bài học tương tác, bài trắc nghiệm kiến thức và kênh hỗ trợ trực tuyến cho thanh thiếu niên.',
    impact:
      'Tiếp cận hơn 50,000 học sinh, sinh viên và cán bộ đoàn viên trong chiến dịch tuyên truyền phòng chống tệ nạn xã hội.',
    tags: ['Học viện CSND', 'Education App', 'Interactive Quiz', 'Gamification', 'Public Health'],
    demoUrl: 'https://gtran.framer.website/project',
    screens: [
      { title: 'Học tập Tương tác Gamified', type: 'mobile', color: '#450a0a', accent: '#f87171', iconName: 'book-open' },
      { title: 'Trắc nghiệm Nhận thức', type: 'ui', color: '#18181b', accent: '#fb7185', iconName: 'check-circle' },
      { title: 'Đường dây nóng Hỗ trợ', type: 'mobile', color: '#172554', accent: '#38bdf8', iconName: 'phone' }
    ],
    previewColor: '#dc2626',
    accentColor: '#f87171',
    metrics: [
      { label: 'Lượt tiếp cận', value: '50K+' },
      { label: 'Hoàn thành bài học', value: '92%' },
      { label: 'Đánh giá ứng dụng', value: '4.9 ★' }
    ],
    caseStudy: {
      problem:
        'Công tác tuyên truyền pháp luật và cảnh báo tác hại ma túy cho thanh thiếu niên trước đây chủ yếu sử dụng pano áp phích và tờ rơi giấy khô khan, tỷ lệ người đọc và ghi nhớ kiến thức rất thấp. Giới trẻ thiếu nhận thức về các loại ma túy tổng hợp mới "núp bóng" trà sữa, bóng cười, thuốc lá điện tử và không biết tìm kiếm sự trợ giúp bảo mật khi gặp người thân sa ngã.',
      solution:
        'Chuyển đổi nội dung giáo dục thành ứng dụng di động tương tác ứng dụng cơ chế Game hóa (Gamification). Xây dựng các tình huống tương tác phân nhánh (Branching Scenarios) nơi người chơi trực tiếp đưa ra lựa chọn, tích hợp thư viện nhận diện ma túy 3D sống động và đường dây nóng hỗ trợ khẩn cấp ẩn danh 1 chạm.',
      deliverables: [
        'Gamified Educational Flow & Branching Narrative Engine',
        'Interactive Quiz & Knowledge Challenge Mechanics',
        'Anonymous SOS Helpline & Mental Health Chat UI',
        '3D Drug Identification Library & Visual Warning System',
        'Illustrative Design System & Youth-oriented Graphic Assets'
      ],
      background:
        'Đề tài nghiên cứu ứng dụng công nghệ trong công tác phòng ngừa tội phạm của Học viện Cảnh sát Nhân dân. Dự án hướng tới việc hiện đại hóa công tác tuyên truyền học đường, trang bị "lá chắn kiến thức" vững chắc cho thế hệ học sinh, sinh viên.',
      targetAudience:
        'Học sinh THCS, THPT và sinh viên đại học (độ tuổi 13 - 22); Phụ huynh và giáo viên chủ nhiệm; Cán bộ đoàn thanh niên tuyên truyền pháp luật.',
      painPoints: [
        {
          title: 'Nội dung tuyên truyền giáo điều, thiếu hấp dẫn',
          desc: 'Văn bản pháp luật dài dòng khiến giới trẻ cảm thấy nhàm chán, đọc lướt qua mà không đọng lại kỹ năng nhận biết thực tế.'
        },
        {
          title: 'Ma túy thế hệ mới ngụy trang tinh vi',
          desc: 'Nhiều bạn trẻ vô tình sử dụng do bị dụ dỗ với mác "tinh dầu thơm", "nước vui" mà không nhận biết được đó là chất cấm.'
        },
        {
          title: 'Tâm lý sợ hãi, e dè khi tìm kiếm hỗ trợ',
          desc: 'Người có người thân vướng vào tệ nạn sợ bị kỳ thị, sợ lộ danh tính nên không dám liên hệ các cơ quan chức năng.'
        }
      ],
      processSteps: [
        {
          step: '01. Nghiên cứu Tâm lý Học sinh - Sinh viên',
          title: 'Khảo sát 500 học sinh tại 5 trường THPT & Đại học',
          desc: 'Phát hiện 89% học sinh thích học qua các câu đố ngắn có chấm điểm và tình huống đóng vai hơn là đọc tài liệu chữ.'
        },
        {
          step: '02. Xây dựng Kịch bản Tương tác (Interactive Narrative)',
          title: 'Thiết kế 12 tình huống thực tế thường gặp',
          desc: 'Xây dựng các case study như: "Bị bạn bè rủ rê dùng thử thuốc lá lạ trong quán bar", "Người lạ nhờ cầm hộ gói bưu phẩm tại bến xe" với các ngã rẽ lựa chọn dẫn đến hậu quả khác nhau.'
        },
        {
          step: '03. Thiết kế Visual & Gamification',
          title: 'Hệ thống Huy hiệu (Badges) & Bảng xếp hạng',
          desc: 'Người dùng hoàn thành các chặng học sẽ mở khóa danh hiệu "Hiệp sĩ Nhận thức", tích điểm đổi quà và thi đấu trắc nghiệm theo trường.'
        },
        {
          step: '04. Bảo mật Kênh SOS Khẩn cấp',
          title: 'Cơ chế ẩn danh tuyệt đối (Zero Knowledge)',
          desc: 'Thiết kế giao diện chat tư vấn tâm lý và đường dây nóng không lưu danh bạ cá nhân, bảo đảm an toàn tuyệt đối cho người báo tin.'
        }
      ],
      keySolutions: [
        {
          title: 'Học tập qua Tình huống Phân nhánh (Interactive Decision Tree)',
          desc: 'Mỗi bài học là một câu chuyện mô phỏng tương tác. Lựa chọn của người chơi sẽ dẫn đến kết cục an toàn hoặc nguy hiểm, từ đó khắc sâu kỹ năng từ chối cám dỗ.',
          highlight: 'Tăng 300% mức độ ghi nhớ kiến thức so với tờ rơi'
        },
        {
          title: 'Từ điển Nhận dạng Ma túy thế hệ mới',
          desc: 'Hình ảnh thực tế độ nét cao kèm phân tích tác hại khôn lường tới hệ thần kinh, dấu hiệu nhận biết ngụy trang và cách xử lý khi phát hiện.',
          highlight: 'Nhận diện chính xác các chất kích thích ngụy trang tinh vi'
        },
        {
          title: 'Nút bấm SOS Hỗ trợ Khẩn cấp & Tư vấn Tâm lý Ẩn danh',
          desc: 'Kết nối nhanh chóng với các chuyên gia tâm lý và trung tâm cai nghiện tự nguyện, cho phép đặt câu hỏi bảo mật không để lại dấu vết.',
          highlight: '100% ẩn danh, xóa tan nỗi sợ bị kỳ thị xã hội'
        }
      ],
      beforeAfter: [
        {
          metric: 'Lượt tiếp cận thanh thiếu niên',
          before: 'Khoảng 5,000 lượt qua hội thảo truyền thống',
          after: '50,000+ Học sinh, sinh viên chủ động tải app',
          note: 'Lan tỏa rộng rãi trên các hội nhóm thanh niên và trường học'
        },
        {
          metric: 'Tỷ lệ hoàn thành toàn bộ bài học nhận thức',
          before: 'Dưới 20% khi đọc tài liệu in',
          after: '92.4% hoàn thành đầy đủ các chặng thử thách',
          note: 'Cơ chế Gamification giữ chân người học hiệu quả'
        },
        {
          metric: 'Điểm đánh giá trải nghiệm người dùng',
          before: 'Chưa có ứng dụng số',
          after: '4.9 ★ trên kho ứng dụng di động',
          note: 'Được các thầy cô giáo và phụ huynh khen ngợi sâu sắc'
        }
      ],
      learnings: [
        'Tuyên truyền các chủ đề xã hội nhạy cảm đòi hỏi sự thấu cảm cao độ, không phán xét và sử dụng đúng ngôn ngữ, hình ảnh của thế hệ trẻ.',
        'Gamification là vũ khí tối thượng để biến những nội dung pháp luật tưởng chừng khô khan thành trải nghiệm học tập lôi cuốn và đáng nhớ.'
      ]
    }
  },
  {
    id: 'proj-6',
    title: 'Ứng dụng Trading view',
    badge: 'Puppies Hub',
    category: 'Mobile app',
    role: 'UI designer',
    owner: 'Puppies Hub',
    imageUrl: '/assets/projects/project-6-tradingview.png',
    summary:
      'Ứng dụng theo dõi biểu đồ tài chính, thị trường phái sinh và phân tích kỹ thuật theo thời gian thực với trải nghiệm Dark Mode chuyên nghiệp và công cụ đặt lệnh siêu tốc.',
    impact:
      'Được cộng đồng Behance vinh danh trong chuyên mục Interaction & UI/UX với hơn 1,200 lượt yêu thích và đánh giá cao.',
    tags: ['Trading App', 'Puppies Hub', 'Financial Charts', 'Dark Theme UX', 'Interaction'],
    demoUrl: 'https://www.behance.net/gallery/157390911/Trading-App',
    screens: [
      { title: 'Biểu đồ Nến Thời gian thực', type: 'mobile', color: '#09090b', accent: '#10b981', iconName: 'trending-up' },
      { title: 'Sổ Lệnh & Độ sâu Thị trường', type: 'ui', color: '#020617', accent: '#06b6d4', iconName: 'bar-chart' },
      { title: 'Đặt lệnh Giao dịch Siêu tốc', type: 'mobile', color: '#111827', accent: '#22c55e', iconName: 'zap' }
    ],
    previewColor: '#059669',
    accentColor: '#34d399',
    metrics: [
      { label: 'Độ trễ cập nhật', value: '< 50ms' },
      { label: 'Behance Likes', value: '1.2K+' },
      { label: 'Công cụ chỉ báo', value: '40+' }
    ],
    caseStudy: {
      problem:
        'Các ứng dụng giao dịch tài chính (Crypto, Forex, Chứng khoán) trên thiết bị di động thường mắc lỗi nhồi nhét quá nhiều thông tin lên một khung màn hình nhỏ. Trader thường xuyên gặp tình trạng biểu đồ bị giật lag, các ngón tay bấm nhầm lệnh mua/bán (Fat-finger error) trong những giây phút thị trường biến động mạnh, và giao diện sáng gây mỏi mắt nghiêm trọng khi theo dõi bảng điện ban đêm.',
      solution:
        'Thiết kế giao diện Dark Theme chuyên sâu với bảng màu trung tính giảm mỏi mắt (OLED Dark Mode). Tối ưu hóa layout biểu đồ nến Candlestick hỗ trợ cảm ứng đa điểm (pinch-to-zoom, pan), thanh công cụ chỉ báo kỹ thuật xếp lớp thông minh và cơ chế đặt lệnh 1 chạm có thanh trượt bảo vệ chống bấm nhầm.',
      deliverables: [
        'High-Performance Candlestick Chart UI & Interaction Spec',
        'Order Book & Market Depth Visualizer',
        'High-Contrast Professional Dark Theme Palette',
        'Rapid Order Execution & Risk Management Sliders',
        'Haptic Feedback & Gesture Control Guidelines'
      ],
      background:
        'Puppies Hub phát triển nền tảng giao dịch thế hệ mới hướng tới cộng đồng nhà giao dịch năng động (Day Traders). Dự án đòi hỏi một chuẩn mực thiết kế khắt khe: tốc độ phản hồi cực nhạy, độ tương phản hoàn hảo và thao tác một tay mượt mà trong mọi tình huống thị trường.',
      targetAudience:
        'Nhà giao dịch chuyên nghiệp (Day Traders, Scalpers), nhà đầu tư cá nhân theo dõi thị trường tài chính hàng ngày cần công cụ phân tích kỹ thuật chuẩn xác trên điện thoại.',
      painPoints: [
        {
          title: 'Lỗi bấm nhầm lệnh giao dịch (Fat-finger errors)',
          desc: 'Nút Mua và Bán đặt quá sát nhau, không có lớp xác nhận nhanh khiến trader bị khớp nhầm khối lượng hoặc vị thế giá khi thị trường biến động mạnh.'
        },
        {
          title: 'Biểu đồ khó phóng to thu nhỏ bằng cảm ứng',
          desc: 'Thao tác vuốt kéo trên màn hình cảm ứng di động thường bị trượt mốc thời gian, khó soi kỹ từng cây nến rút râu.'
        },
        {
          title: 'Mỏi mắt và ô nhiễm thị giác',
          desc: 'Giao diện sử dụng màu sắc quá rực rỡ và lộn xộn khiến mắt bị kiệt sức khi phải theo dõi thị trường liên tục nhiều giờ liền.'
        }
      ],
      processSteps: [
        {
          step: '01. Nghiên cứu Thói quen Cầm máy của Trader',
          title: 'Phân tích bản đồ nhiệt ngón tay cái (Thumb Heatmap)',
          desc: 'Bố trí các nút thao tác then chốt (Đặt lệnh, Đóng vị thế, Đổi khung giờ nến) trong tầm với tự nhiên nhất của ngón cái khi cầm máy 1 tay.'
        },
        {
          step: '02. Xây dựng Bảng màu Dark Mode Chuyên Nghiệp',
          title: 'Tối ưu độ tương phản theo chuẩn OLED Dark Theme',
          desc: 'Sử dụng màu nền đen sâu (#09090B) kết hợp các sắc độ xanh lá (#10B981) và đỏ (#EF4444) được tinh chỉnh giảm độ chói, đạt chuẩn tương phản cao nhưng không gây nhức mắt.'
        },
        {
          step: '03. Tối ưu Hiệu năng Render Biểu đồ',
          title: 'Thiết kế giao diện tương thích tốc độ làm tươi 120Hz',
          desc: 'Phối hợp với kỹ sư Frontend tối ưu hóa layout để biểu đồ nến và sổ lệnh (Order Book) cập nhật mượt mà với độ trễ dưới 50ms mà không làm tụt FPS.'
        },
        {
          step: '04. Thử nghiệm Cơ chế Đặt lệnh An toàn',
          title: 'Thiết kế thanh trượt kéo xác nhận lệnh (Slide-to-Confirm)',
          desc: 'Thay thế nút bấm đơn giản bằng thao tác trượt dứt khoát kết hợp rung haptic, loại bỏ 100% tình trạng bấm nhầm lệnh do vô ý.'
        }
      ],
      keySolutions: [
        {
          title: 'Biểu đồ Nến Thời gian thực Tối ưu Cảm ứng Đa điểm',
          desc: 'Hỗ trợ phóng to thu nhỏ mượt mà theo cả trục giá và trục thời gian, thanh thước đo khoảng cách PnL nhanh chóng bằng thao tác chạm 2 ngón tay.',
          highlight: 'Độ phản hồi biểu đồ dưới 50ms, chuẩn xác từng pip giá'
        },
        {
          title: 'Sổ Lệnh & Độ Sâu Thị Trường Trực Quan (Order Book Depth)',
          desc: 'Trực quan hóa khối lượng mua/bán (Bid/Ask) dưới dạng biểu đồ diện tích động, giúp trader nhận biết ngay các tường giá lớn của "cá mập".',
          highlight: 'Nắm bắt biến động cung cầu tức thời trong 1 giây'
        },
        {
          title: 'Cơ chế Đặt lệnh Siêu tốc với Thanh trượt Quản lý Vốn (Risk Slider)',
          desc: 'Tự động tính toán số tiền rủi ro (% tài khoản) và điểm Stop Loss / Take Profit ngay trên giao diện đặt lệnh mà không cần mở máy tính cá nhân.',
          highlight: 'Xóa bỏ hoàn toàn lỗi vào nhầm khối lượng (Fat-finger)'
        }
      ],
      beforeAfter: [
        {
          metric: 'Độ trễ phản hồi tương tác (Latency)',
          before: '150 - 200ms',
          after: '< 50ms (Phản hồi tức thì)',
          note: 'Tối ưu hóa triệt để cấu trúc component và animation'
        },
        {
          metric: 'Tỷ lệ phát sinh lỗi bấm nhầm lệnh',
          before: 'Ước tính 3 - 5% trong các phiên biến động',
          after: '0% nhờ cơ chế Slide-to-Confirm & Haptic Feedback',
          note: 'Bảo vệ an toàn nguồn vốn của nhà giao dịch'
        },
        {
          metric: 'Đánh giá chuyên môn trên Behance',
          before: 'Bản thảo ban đầu',
          after: '1,200+ Likes & Vinh danh Featured in Interaction',
          note: 'Nhận được sự công nhận nồng nhiệt từ cộng đồng thiết kế quốc tế'
        }
      ],
      learnings: [
        'Thiết kế sản phẩm tài chính tốc độ cao đòi hỏi đặt tính chính xác và an toàn lên hàng đầu. Một cú nhấp chuột sai lầm có thể khiến người dùng mất tiền thật.',
        'Dark mode không đơn giản là đổi nền sang màu đen. Việc kiểm soát độ bão hòa màu sắc (Saturation) và phân tầng lớp nền (Elevation layers) là chìa khóa tạo nên sự sang trọng và tính công thái học.'
      ]
    }
  },
  {
    id: 'proj-7',
    title: 'Ứng dụng quản lý dữ liệu nước',
    badge: 'Bộ NN & PTNT',
    category: 'Mobile app',
    role: 'UI designer',
    owner: 'Bộ Nông nghiệp và Phát triển nông thôn',
    imageUrl: '/assets/projects/project-7-dulieunuoc.png',
    summary:
      'Ứng dụng di động giám sát dữ liệu nguồn nước, mực nước hồ chứa, lưu lượng xả lũ và cảnh báo thiên tai sớm phục vụ công tác điều hành thủy lợi.',
    impact:
      'Cung cấp dữ liệu cảnh báo mực nước khẩn cấp cho hơn 30 trạm quan trắc trọng điểm, giảm thiểu rủi ro thiên tai mùa mưa bão.',
    tags: ['Bộ NN & PTNT', 'Water Data App', 'IoT Monitoring', 'Disaster Early Warning', 'Hydrology'],
    demoUrl: 'https://gtran.framer.website/project',
    screens: [
      { title: 'Bản đồ Quan trắc Hồ chứa', type: 'mobile', color: '#082f49', accent: '#38bdf8', iconName: 'map' },
      { title: 'Cảnh báo Ngập lụt Thời gian thực', type: 'ui', color: '#1c1917', accent: '#f59e0b', iconName: 'alert-triangle' },
      { title: 'Lịch sử Xả lũ & Mực nước', type: 'mobile', color: '#030712', accent: '#60a5fa', iconName: 'droplet' }
    ],
    previewColor: '#0284c7',
    accentColor: '#38bdf8',
    metrics: [
      { label: 'Trạm kết nối', value: '30+ Trạm' },
      { label: 'Cảnh báo tức thì', value: '< 1 Phút' },
      { label: 'Độ tin cậy cảm biến', value: '99.8%' }
    ],
    caseStudy: {
      problem:
        'Cán bộ phụ trách quản lý hồ đập và trạm khí tượng thủy văn tại các vùng sâu vùng xa trước đây phải đến tận cọc đo để ghi chép mực nước thủ công bằng sổ sách rồi gọi điện thoại báo về trung tâm. Trong các mùa mưa bão lũ quét ban đêm, đường xá bị sạt lở chia cắt khiến thông tin mực nước bị gián đoạn, nguy cơ xảy ra sự cố vỡ đập hoặc chậm xả lũ đe dọa trực tiếp tính mạng nhân dân vùng hạ du.',
      solution:
        'Xây dựng ứng dụng di động kết nối trực tiếp với mạng lưới cảm biến IoT đo mực nước và lượng mưa tự động. Tích hợp bản đồ thủy văn động hiển thị mực nước hồ chứa theo thời gian thực, hệ thống cảnh báo âm thanh khẩn cấp cấp độ cao (Override Silent Mode) khi mực nước chạm ngưỡng báo động đỏ, và tính năng đồng bộ ngoại tuyến (Offline-First) tự lưu dữ liệu khi mất sóng viễn thông.',
      deliverables: [
        'Mobile IoT Monitoring Dashboard & Hydrology Map UI',
        'Critical Emergency Alert & Acoustic Alarm System',
        'Offline-First Data Sync & Field Inspection Log UI',
        'Historical Flood Discharge & Rainfall Analytics Visualizer',
        'Rugged Field UI Kit with High Sunlight Readability'
      ],
      background:
        'Dự án trọng điểm thuộc Ban Quản lý Trung ương các Dự án Thủy lợi (CPO) - Bộ NN&PTNT nhằm hiện đại hóa công nghệ giám sát an toàn đập và hồ chứa nước, ứng phó biến đổi khí hậu và giảm thiểu thiệt hại thiên tai trên toàn quốc.',
      targetAudience:
        'Cán bộ trực hồ chứa tại các trạm thủy nông vùng cao; Ban chỉ huy phòng chống thiên tai cấp tỉnh/huyện; Lãnh đạo Cục Thủy lợi theo dõi điều tiết nguồn nước.',
      painPoints: [
        {
          title: 'Đo đạc thủ công nguy hiểm trong mưa bão',
          desc: 'Cán bộ phải trèo ra chân đập trong đêm tối mưa to gió lớn để soi đèn đọc vạch nước, nguy cơ trượt ngã nguy hiểm đến tính mạng.'
        },
        {
          title: 'Mất kết nối mạng Internet tại vùng sâu vùng xa',
          desc: 'Khi bão đổ bộ, các trạm phát sóng di động thường bị mất điện hoặc đứt cáp quang, ứng dụng thông thường sẽ bị tê liệt hoàn toàn.'
        },
        {
          title: 'Khó quan sát màn hình ngoài trời nắng gắt',
          desc: 'Giao diện thông thường bị lóa sáng khi kỹ sư kiểm tra hồ chứa dưới ánh nắng mặt trời gắt gao.'
        }
      ],
      processSteps: [
        {
          step: '01. Thực địa tại các Hồ chứa Trọng điểm',
          title: 'Khảo sát điều kiện làm việc thực tế của cán bộ trực',
          desc: 'Đến tận các trạm quan trắc thủy văn miền núi để trải nghiệm điều kiện làm việc khắc nghiệt: mưa bão, sóng di động chập chờn và thiết bị di động pin yếu.'
        },
        {
          step: '02. Thiết kế Cơ chế Lưu trữ Ngoại tuyến (Offline-First UX)',
          title: 'Đảm bảo ứng dụng hoạt động ngay cả khi mất mạng hoàn toàn',
          desc: 'Thiết kế cơ chế lưu trữ đệm cục bộ (Local Storage & SQLite). Cán bộ vẫn xem được dữ liệu gần nhất và nhập ghi chép, hệ thống sẽ tự động đồng bộ lên đám mây ngay khi có sóng trở lại.'
        },
        {
          step: '03. Tối ưu Độ tương phản Ngoài trời (High-Contrast Outdoor Mode)',
          title: 'Chế độ hiển thị tương phản cao chống chói nắng',
          desc: 'Áp dụng các khối màu tương phản mạnh, kích thước chữ lớn và icon sắc nét giúp cán bộ dễ dàng đọc số liệu dưới ánh nắng gắt mà không cần che tay.'
        },
        {
          step: '04. Xây dựng Chuông Báo động Khẩn cấp Cấp độ Cao',
          title: 'Âm thanh cảnh báo vượt ngưỡng báo động lũ',
          desc: 'Thiết kế chuông báo động với âm lượng tối đa kể cả khi máy đang để chế độ im lặng, kèm đèn flash nhấp nháy để đánh thức cán bộ trực ca đêm.'
        }
      ],
      keySolutions: [
        {
          title: 'Bản đồ Thủy văn Thời gian thực Kết nối Cảm biến IoT',
          desc: 'Hiển thị trực quan mực nước hiện tại so với mực nước dâng bình thường (MNDBT) và mực nước lũ thiết kế (MNLTK) bằng màu sắc trực quan (Xanh -> Vàng -> Đỏ).',
          highlight: 'Cập nhật số liệu tự động mỗi 5 phút từ trạm cảm biến'
        },
        {
          title: 'Hệ thống Cảnh báo Thiên tai Khẩn cấp Đa kênh',
          desc: 'Tự động gửi thông báo đẩy khẩn cấp, rung mạnh và kích hoạt còi hú khi mực nước vượt ngưỡng an toàn, hỗ trợ đếm ngược thời gian dự kiến phải xả lũ.',
          highlight: 'Thời gian phát cảnh báo dưới 1 phút từ khi cảm biến ghi nhận'
        },
        {
          title: 'Biểu đồ Lịch sử Lưu lượng Xả & Dự báo Thủy văn',
          desc: 'Trực quan hóa lượng mưa tích lũy và lưu lượng nước về hồ, kết hợp mô hình dự báo để đề xuất kịch bản xả lũ an toàn cho vùng hạ du.',
          highlight: 'Hỗ trợ lãnh đạo ra quyết định điều tiết hồ chứa kịp thời'
        }
      ],
      beforeAfter: [
        {
          metric: 'Thời gian thu thập và gửi số liệu mực nước',
          before: '2 - 4 Giờ (Đo thủ công và gọi điện báo cáo)',
          after: '< 1 Phút (Cảm biến IoT tự động truyền số liệu)',
          note: 'Tăng tốc độ phản ứng khẩn cấp gấp hàng trăm lần'
        },
        {
          metric: 'Mức độ an toàn của cán bộ vận hành',
          before: 'Rủi ro cao do phải ra chân đập đo đạc ban đêm',
          after: 'An toàn 100% (Theo dõi từ xa qua màn hình ứng dụng)',
          note: 'Bảo vệ an toàn tính mạng cho cán bộ ngành thủy lợi'
        },
        {
          metric: 'Số lượng trạm hồ chứa kết nối tự động',
          before: '0 Trạm',
          after: '30+ Trạm quan trắc trọng điểm toàn quốc',
          note: 'Hệ sinh thái IoT giám sát thủy văn vận hành ổn định 24/7'
        }
      ],
      learnings: [
        'Thiết kế ứng dụng phục vụ phòng chống thiên tai đòi hỏi tư duy "Design for Worst-case Scenario": luôn chuẩn bị cho tình huống mất điện, mất sóng viễn thông và thiết bị pin yếu.',
        'Sự rõ ràng, trực quan và tốc độ phát cảnh báo chính xác trong từng giây phút chính là ranh giới giữa an toàn và thảm họa thiên tai.'
      ]
    }
  }
];

export const experienceData: ExperienceItem[] = [
  {
    id: 'exp-1',
    orderNumber: 1,
    isCurrent: true,
    period: '09/2023 - Hiện tại',
    role: 'Product Designer',
    company: 'Ngân hàng TMCP Quân đội',
    companySubtitle: 'MB Bank',
    logoType: 'mb',
    location: 'Hà Nội, Việt Nam',
    badgeColor: '#ef4444',
    bullets: [
      'Dẫn dắt quá trình thiết kế các hành trình ngân hàng số trên Web và App, từ khám phá vấn đề, xác định cơ hội đến xây dựng giải pháp, bàn giao và đánh giá sau triển khai.',
      'Kết hợp nghiên cứu người dùng, phản hồi khách hàng, dữ liệu vận hành và mục tiêu kinh doanh để đưa ra các quyết định thiết kế có căn cứ.',
      'Đánh giá trải nghiệm end-to-end, tối ưu user flow, giao diện và UX Writing nhằm giảm trở ngại trong những hành trình có nghiệp vụ phức tạp.',
      'Phối hợp cùng PO, Business, Technology và các đơn vị vận hành để xử lý trade-off giữa trải nghiệm, nghiệp vụ, tuân thủ và khả năng triển khai.'
    ],
    skills: ['Enterprise Banking', 'BIZ MBBank 2.0', 'UX Strategy', 'Product Discovery', 'Design System', 'UX Writing']
  },
  {
    id: 'exp-2',
    orderNumber: 2,
    period: '07/2021 - 08/2023',
    role: 'Product Designer',
    company: 'Ngân hàng TMCP Kiên Long',
    companySubtitle: 'KienlongBank',
    logoType: 'kienlong',
    location: 'TP. Hồ Chí Minh, Việt Nam',
    badgeColor: '#f97316',
    bullets: [
      'Phụ trách phân tích và thiết kế trải nghiệm cho các sản phẩm ngân hàng số trên Web và App.',
      'Chuyển hóa yêu cầu nghiệp vụ thành information architecture, user flow, wireframe và prototype có thể kiểm thử.',
      'Nghiên cứu hành vi, xác định pain point và kiểm thử giải pháp để cải thiện trải nghiệm trước khi triển khai.',
      'Phối hợp cùng Product, Business và Technology để cân bằng giữa nhu cầu người dùng, mục tiêu sản phẩm và khả năng triển khai.'
    ],
    skills: ['eKYC', 'Retail Banking', 'Journey Mapping', 'Prototyping', 'User Testing', 'Mobile App UX']
  },
  {
    id: 'exp-3',
    orderNumber: 3,
    period: '6/2018 - 06/2021',
    role: 'UI Designer',
    company: 'Công ty AgileTech',
    companySubtitle: 'AgileTech Vietnam',
    logoType: 'agiletech',
    location: 'Hà Nội, Việt Nam',
    badgeColor: '#e11d48',
    bullets: [
      'Tham gia thiết kế UX/UI cho nhiều sản phẩm Web và App, từ tiếp nhận yêu cầu đến hoàn thiện giao diện và bàn giao phát triển.',
      'Phối hợp cùng BA, Product và Developer để xây dựng user flow, wireframe và giao diện phù hợp với yêu cầu dự án.',
      'Xây dựng nền tảng về tư duy thiết kế, quy trình phát triển sản phẩm và cách làm việc trong đội ngũ đa chức năng.'
    ],
    skills: ['UI/UX Design', 'Web & Mobile', 'Wireframing', 'Visual Design', 'Agile/Scrum', 'Developer Handoff']
  }
];

export const contactInfo: ContactInfo = {
  phone: '0347324455',
  email: 'mrtran@gmail.com',
  linkedin: 'https://www.linkedin.com/in/gtran-designer',
  behance: 'https://www.behance.net/gtran',
  facebook: 'https://www.facebook.com/gtran.design',
  github: 'https://github.com/gtran-product-designer',
  location: 'Hà Nội / TP. Hồ Chí Minh, Việt Nam',
  availability: 'Đang mở cho cơ hội Senior Product Designer / Lead UX',
  dropboxCvUrl: DROPBOX_CV_URL
};

export const contactData = contactInfo;

export interface ExploreValueItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  metric: string;
  metricLabel: string;
}

export const exploreData = {
  headline: 'Tôi có thể mang lại gì cho doanh nghiệp của bạn?',
  badge: 'VALUE PROPOSITION & PRODUCT IMPACT',
  intro:
    'Không chỉ dừng lại ở những bản vẽ giao diện đẹp mắt, giá trị lớn nhất tôi mang tới cho doanh nghiệp là khả năng giải quyết triệt để các bài toán nghiệp vụ, chuyển hóa mục tiêu kinh doanh thành sản phẩm thực tế, loại bỏ rào cản người dùng và tối ưu chi phí phát triển.',
  pillars: [
    {
      id: 'cro',
      title: 'Tối ưu tỷ lệ chuyển đổi & Thúc đẩy doanh thu',
      subtitle: 'TẬP TRUNG VÀO DÒNG TIỀN VÀ TĂNG TRƯỞNG KHÁCH HÀNG',
      description:
        'Trực tiếp rà soát và tái cấu trúc các phễu hành vi then chốt (onboarding, eKYC, đăng ký gói, thanh toán), xóa bỏ triệt để các điểm nghẽn thao tác để chuyển đổi tối đa lượng người dùng truy cập thành doanh thu thực tế.',
      deliverables: [
        'Tăng tỷ lệ hoàn thành tác vụ và chuyển đổi người dùng (Conversion Rate)',
        'Giảm thiểu tối đa tỷ lệ rời bỏ quy trình giao dịch xuống dưới 10%',
        'Tối ưu hóa trải nghiệm giữ chân khách hàng (User Retention & LTV)'
      ],
      metric: '+35%',
      metricLabel: 'Tỷ lệ chuyển đổi'
    },
    {
      id: 'design-ops',
      title: 'Tiết kiệm chi phí & Rút ngắn thời gian ra mắt (Time-to-Market)',
      subtitle: 'GIẢM TẢI 40% CHI PHÍ PHÁT TRIỂN & BẢO TRÌ SẢN PHẨM',
      description:
        'Xây dựng hệ thống Design System & Design Tokens chuẩn hóa, đồng bộ 1:1 với đội ngũ Frontend. Kỹ sư tái sử dụng thư viện UI có sẵn để code ngay, không tốn thời gian vẽ lại từ đầu hay sửa lỗi lặp đi lặp lại.',
      deliverables: [
        'Rút ngắn 40% thời gian thiết kế, code giao diện và bàn giao sản phẩm',
        'Đồng bộ giao diện toàn diện trên Web & App, tăng tốc độ phát hành tính năng',
        'Giảm thiểu hơn 60% lỗi phát sinh (UI bugs) trong quá trình phát triển'
      ],
      metric: '-40%',
      metricLabel: 'Thời gian & Chi phí Dev'
    },
    {
      id: 'fintech-enterprise',
      title: 'Đơn giản hóa bài toán nghiệp vụ phức tạp thành trải nghiệm dễ dùng',
      subtitle: 'CHUYÊN SÂU LĨNH VỰC FINTECH, NGÂN HÀNG SỐ & BẢO MẬT',
      description:
        'Với hơn 8 năm thực chiến tại các ngân hàng lớn (MBBank, Kienlongbank), tôi am hiểu sâu sắc quy trình tín dụng, BIZ platform, ký số và bảo mật đa tầng để biến những thủ tục khô khan, nặng nề thành luồng thao tác trực quan, thân thiện.',
      deliverables: [
        'Biến các quy trình nghiệp vụ nhiều bước phức tạp thành trải nghiệm vài chạm',
        'Đảm bảo tuyệt đối các tiêu chuẩn bảo mật và quy định pháp lý ngành ngân hàng',
        'Giảm tải tối đa khối lượng hỗ trợ khách hàng và sai sót thao tác của người dùng'
      ],
      metric: '98%',
      metricLabel: 'Hài lòng nghiệp vụ'
    },
    {
      id: 'bridge',
      title: 'Giảm thiểu rủi ro đầu tư bằng tư duy Data-Driven & Khả thi kỹ thuật',
      subtitle: 'CẦU NỐI ĐỒNG THUẬN GIỮA MỤC TIÊU KINH DOANH VÀ ĐỘI NGŨ KỸ THUẬT',
      description:
        'Không bao giờ thiết kế dựa trên phỏng đoán cảm tính. Tôi sử dụng số liệu hành vi thực tế để bảo vệ giải pháp trước Ban giám đốc, đồng thời thấu hiểu kiến trúc lập trình để đảm bảo mọi ý tưởng đều khả thi 100% khi triển khai code.',
      deliverables: [
        'Đưa ra quyết định thiết kế có số liệu và căn cứ rõ ràng, tránh đầu tư lãng phí',
        '100% bản vẽ thiết kế ăn khớp với khả năng triển khai thực tế của Developers',
        'Đồng hành sát sao cùng Product Manager và Kỹ sư từ khâu ý tưởng đến ngày Go-live'
      ],
      metric: '100%',
      metricLabel: 'Khả thi triển khai'
    }
  ],
  workflow: [
    {
      step: '01',
      title: 'Discovery & Audit',
      desc: 'Phân tích số liệu phễu, phỏng vấn người dùng thực tế và khảo sát đối thủ cạnh tranh.'
    },
    {
      step: '02',
      title: 'Strategy & Architecture',
      desc: 'Xác định Service Blueprint, luồng tương tác cốt lõi và tiêu chí thành công (Success Metrics).'
    },
    {
      step: '03',
      title: 'Prototyping & UX Writing',
      desc: 'Thiết kế Wireframe, bản mẫu tương tác thực tế và ngôn từ sản phẩm dễ hiểu, rõ ràng.'
    },
    {
      step: '04',
      title: 'Usability Validation',
      desc: 'Kiểm thử giải pháp trên người dùng mục tiêu, phát hiện lỗ hổng và tinh chỉnh trước khi code.'
    },
    {
      step: '05',
      title: 'Handoff & Scalability',
      desc: 'Bàn giao bộ tài liệu Design Tokens, UI Specs chuẩn xác và theo dõi chỉ số sau phát hành.'
    }
  ]
};

export const ZONES_CONFIG: ZoneConfig[] = [
  {
    id: 'about',
    title: 'GIỚI THIỆU',
    signText: 'GIỚI THIỆU',
    position: [-10, 0, 7],
    targetPosition: [-8.5, 0.4, 5.5],
    cameraOffset: [0, 4, 9],
    interactionRadius: 2.4,
    highlightColor: 0x22c55e
  },
  {
    id: 'work',
    title: 'DỰ ÁN CỦA TÔI',
    signText: 'DỰ ÁN CỦA TÔI',
    position: [9, 0, 7],
    targetPosition: [7.5, 0.4, 5.5],
    cameraOffset: [0, 4.5, 9.5],
    interactionRadius: 2.4,
    highlightColor: 0x38bdf8
  },
  {
    id: 'experience',
    title: 'KINH NGHIỆM LÀM VIỆC',
    signText: 'KINH NGHIỆM LÀM VIỆC',
    position: [-1, 3.8, -1.5], // Chính giữa hòn đảo / trung tâm
    targetPosition: [-0.8, 4.2, -0.5], // Đứng trên mặt đảo gần biển hiệu, sau khi đã leo hết cầu thang
    cameraOffset: [0, 4.5, 8.5],
    interactionRadius: 2.2,
    highlightColor: 0x10b981
  },
  {
    id: 'explore',
    title: 'KHÁM PHÁ',
    signText: 'KHÁM PHÁ',
    position: [9.5, 4.2, -7.5], // Góc đài thư viện tri thức / vách núi nhìn toàn cảnh
    targetPosition: [8.5, 4.5, -4.5],
    cameraOffset: [0, 6, 11],
    interactionRadius: 2.5,
    highlightColor: 0x38bdf8
  },
  {
    id: 'contact',
    title: 'LIÊN HỆ',
    signText: 'LIÊN HỆ',
    position: [-11, 4.2, -7.5],
    targetPosition: [-9.5, 4.5, -5.2],
    cameraOffset: [0, 5, 10],
    interactionRadius: 2.5,
    highlightColor: 0x22c55e
  }
];
