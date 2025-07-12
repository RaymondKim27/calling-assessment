# 소명 발견 자가진단 도구 🎯

> 청년 그리스도인들이 하나님이 주신 소명을 발견할 수 있도록 돕는 인터랙티브 자가진단 도구

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Demo-brightgreen)](https://YOUR_USERNAME.github.io/calling-assessment/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📖 프로젝트 소개

이 프로젝트는 **"소명을 따라 사는 삶: 청년 그리스도인을 위한 일터신앙 가이드"** 브런치 연재와 함께 제작된 소명 발견 자가진단 도구입니다. 

15개의 체계적인 질문을 통해 개인의 **관심사**, **재능**, **가치관**을 분석하여 4가지 소명 유형 중 자신에게 맞는 유형을 발견할 수 있습니다.

### ✨ 주요 특징

- **📊 과학적 접근**: 마르틴 루터의 직업소명론과 현대 조직심리학 연구를 바탕으로 설계
- **🎨 직관적 UI**: 모바일 친화적인 반응형 디자인
- **📈 시각적 결과**: 레이더 차트를 통한 명확한 결과 표시
- **🔄 결과 공유**: 소셜 미디어 공유 및 클립보드 복사 기능
- **📱 완전 반응형**: 데스크톱, 태블릿, 모바일 모든 기기 지원

## 🎯 4가지 소명 유형

| 유형 | 특징 | 추천 직업군 |
|------|------|-------------|
| **🧠 지혜 추구형** | 진리와 지혜를 추구하며 깊이 있는 사고와 분석을 통해 세상을 이해 | 연구원, 교수, 분석가, 컨설턴트 |
| **🎨 창조 실현형** | 창의성을 통해 새로운 것을 만들어내고 혁신을 추구 | 디자이너, 예술가, 기획자, 창업가 |
| **❤️ 사랑 실천형** | 사람들과의 관계를 통해 사랑을 실천하고 다른 이들의 성장을 도움 | 상담사, 교사, 의료진, 사회복지사 |
| **⚖️ 질서 구축형** | 질서와 체계를 통해 안정적이고 공정한 사회를 만들어감 | 관리자, 공무원, 법무진, 회계사 |

## 🚀 빠른 시작

### 1. 저장소 복제
```bash
git clone https://github.com/YOUR_USERNAME/calling-assessment.git
cd calling-assessment
```

### 2. 로컬에서 실행
```bash
# Python 3가 설치된 경우
python -m http.server 8000

# Node.js가 설치된 경우
npx serve .

# 브라우저에서 http://localhost:8000 접속
```

### 3. GitHub Pages로 배포
1. GitHub 저장소 Settings → Pages
2. Source: "Deploy from a branch" 선택
3. Branch: "main" 선택
4. 몇 분 후 `https://YOUR_USERNAME.github.io/calling-assessment/` 에서 접속 가능

## 📁 파일 구조

```
calling-assessment/
├── index.html              # 메인 진단 페이지
├── data-collection.js      # 데이터 수집 모듈 (선택사항)
├── README.md              # 프로젝트 설명서
├── DEPLOYMENT_GUIDE.md    # 상세 배포 가이드
├── QUICK_START.md         # 5분 배포 가이드
└── netlify-form.html      # Netlify Forms 설정 (선택사항)
```

## 🔧 커스터마이징

### 질문 수정
`index.html`의 `quizData` 배열에서 질문과 옵션을 수정할 수 있습니다:

```javascript
const quizData = [
    {
        category: '관심사',
        question: '새로운 질문을 여기에 입력하세요',
        options: [
            { text: '옵션 1', type: 'intellectual' },
            { text: '옵션 2', type: 'creative' },
            // ...
        ]
    }
    // ...
];
```

### 소명 유형 수정
`callingTypes` 객체에서 유형별 설명과 추천사항을 수정할 수 있습니다:

```javascript
const callingTypes = {
    intellectual: {
        name: '새로운 유형명',
        description: '새로운 설명...',
        recommendations: ['추천사항 1', '추천사항 2']
    }
    // ...
};
```

### 디자인 수정
Tailwind CSS 클래스를 수정하여 색상과 레이아웃을 변경할 수 있습니다:

```html
<!-- 메인 색상 변경 예시 -->
<style>
.bg-gradient-to-r.from-amber-500.to-orange-500 {
    background: linear-gradient(to right, #YOUR_COLOR1, #YOUR_COLOR2);
}
</style>
```

## 📊 데이터 수집 (선택사항)

### GitHub Issues 방법
```javascript
// index.html에서 설정
const response = await fetch('https://api.github.com/repos/YOUR_USERNAME/calling-assessment-data/issues', {
    method: 'POST',
    headers: {
        'Authorization': 'token YOUR_GITHUB_TOKEN'
    },
    // ...
});
```

### Netlify Forms 방법
```html
<!-- 숨겨진 폼 추가 -->
<form name="calling-assessment" netlify hidden>
    <input type="text" name="dominantType" />
    <input type="text" name="scores" />
    <!-- ... -->
</form>
```

## 🧪 테스트

### 로컬 테스트
1. 브라우저에서 진단 도구 완전히 테스트
2. 모든 질문에 답변하고 결과 확인
3. 모바일 기기에서도 테스트

### 배포 후 테스트
1. GitHub Pages URL 접속
2. 모든 기능 정상 작동 확인
3. 결과 저장 기능 테스트 (설정한 경우)

## 📚 학술적 근거

이 진단 도구는 다음과 같은 학술적 연구를 바탕으로 개발되었습니다:

### 이론적 배경
- **마르틴 루터의 직업소명론 (Beruf)**: 모든 정당한 직업이 하나님의 부르심이라는 개념
- **리 하디(Lee Hardy)의 소명 이론**: 『직업과 소명에 대한 기독교적 관점』의 현대적 해석
- **현대 조직심리학 연구**: 일의 의미와 소명 의식에 관한 실증 연구

### 주요 참고문헌
- Hardy, L. (1990). *The Fabric of This World: Inquiries into Calling, Career Choice, and the Design of Human Work*. Eerdmans.
- Dik, B. J., & Duffy, R. D. (2009). Calling and vocation at work. *The Counseling Psychologist, 37*(3), 424-450.
- Wrzesniewski, A. (2003). Finding positive meaning in work. *Positive Organizational Scholarship*, 296-308.

## 👨‍💼 개발 배경

이 도구는 다음과 같은 학술적 근거를 바탕으로 개발되었습니다:


## 🤝 기여하기

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 📞 문의 및 지원

- **이슈 리포트**: [GitHub Issues](https://github.com/YOUR_USERNAME/calling-assessment/issues)
- **브런치 연재**: [소명을 따라 사는 삶](https://brunch.co.kr)
- **이메일**: your-email@example.com

## ⚖️ 면책조항

이 진단 도구는 자기 이해를 돕기 위한 참고 자료입니다. 진단 결과가 절대적이지 않으며, 개인의 소명 발견을 위한 하나의 도구로 활용하시기 바랍니다. 더 깊은 상담이나 진로 지도가 필요한 경우 전문가의 도움을 받으시기를 권합니다.

---

**"하나님이 각 사람에게 주신 고유한 소명을 발견하고, 그 소명을 따라 살아가는 삶을 응원합니다."** 🙏

[![Made with ❤️ for the Kingdom](https://img.shields.io/badge/Made%20with%20❤️-for%20the%20Kingdom-red)](https://github.com/YOUR_USERNAME/calling-assessment)

