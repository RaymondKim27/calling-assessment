// 설문 결과 수집을 위한 다양한 방법들

class DataCollector {
    constructor(config = {}) {
        this.config = {
            method: config.method || 'github', // 'github', 'netlify', 'formspree', 'local'
            githubRepo: config.githubRepo || '',
            githubToken: config.githubToken || '',
            netlifyFormName: config.netlifyFormName || 'calling-assessment',
            formspreeEndpoint: config.formspreeEndpoint || '',
            ...config
        };
    }

    async saveResult(resultData) {
        try {
            switch (this.config.method) {
                case 'github':
                    return await this.saveToGitHub(resultData);
                case 'netlify':
                    return await this.saveToNetlify(resultData);
                case 'formspree':
                    return await this.saveToFormspree(resultData);
                case 'local':
                    return this.saveToLocal(resultData);
                default:
                    throw new Error('Unknown data collection method');
            }
        } catch (error) {
            console.error('Error saving result:', error);
            // 실패 시 로컬 저장소에 백업
            this.saveToLocal(resultData);
            throw error;
        }
    }

    // GitHub Issues API를 통한 저장
    async saveToGitHub(resultData) {
        if (!this.config.githubRepo || !this.config.githubToken) {
            throw new Error('GitHub configuration missing');
        }

        const response = await fetch(`https://api.github.com/repos/${this.config.githubRepo}/issues`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `token ${this.config.githubToken}`,
                'Accept': 'application/vnd.github.v3+json'
            },
            body: JSON.stringify({
                title: `Assessment Result - ${new Date().toISOString()}`,
                body: `## 소명 발견 자가진단 결과

**진단 시간:** ${resultData.timestamp}
**주요 유형:** ${resultData.dominantType}

### 점수 상세
\`\`\`json
${JSON.stringify(resultData.scores, null, 2)}
\`\`\`

### 사용자 정보
- **연령대:** ${resultData.age || '미제공'}
- **직업 상태:** ${resultData.jobStatus || '미제공'}

### 기술 정보
\`\`\`json
${JSON.stringify({
    userAgent: resultData.userAgent,
    timestamp: resultData.timestamp,
    version: resultData.version || '1.0'
}, null, 2)}
\`\`\``,
                labels: ['assessment-result', resultData.dominantType, resultData.age || 'no-age', resultData.jobStatus || 'no-job']
            })
        });

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }

        return await response.json();
    }

    // Netlify Forms를 통한 저장
    async saveToNetlify(resultData) {
        const formData = new FormData();
        formData.append('form-name', this.config.netlifyFormName);
        formData.append('timestamp', resultData.timestamp);
        formData.append('dominantType', resultData.dominantType);
        formData.append('scores', JSON.stringify(resultData.scores));
        formData.append('age', resultData.age || '');
        formData.append('jobStatus', resultData.jobStatus || '');
        formData.append('userAgent', resultData.userAgent);

        const response = await fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData).toString()
        });

        if (!response.ok) {
            throw new Error(`Netlify Forms error: ${response.status}`);
        }

        return { success: true, method: 'netlify' };
    }

    // Formspree를 통한 저장
    async saveToFormspree(resultData) {
        if (!this.config.formspreeEndpoint) {
            throw new Error('Formspree endpoint missing');
        }

        const response = await fetch(this.config.formspreeEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                timestamp: resultData.timestamp,
                dominantType: resultData.dominantType,
                scores: resultData.scores,
                age: resultData.age,
                jobStatus: resultData.jobStatus,
                userAgent: resultData.userAgent
            })
        });

        if (!response.ok) {
            throw new Error(`Formspree error: ${response.status}`);
        }

        return await response.json();
    }

    // 로컬 저장소에 저장 (백업용)
    saveToLocal(resultData) {
        try {
            const existingData = JSON.parse(localStorage.getItem('callingAssessmentResults') || '[]');
            existingData.push(resultData);
            localStorage.setItem('callingAssessmentResults', JSON.stringify(existingData));
            return { success: true, method: 'local' };
        } catch (error) {
            console.error('Local storage error:', error);
            return { success: false, method: 'local', error: error.message };
        }
    }

    // 로컬 저장된 데이터 조회
    getLocalResults() {
        try {
            return JSON.parse(localStorage.getItem('callingAssessmentResults') || '[]');
        } catch (error) {
            console.error('Error reading local results:', error);
            return [];
        }
    }

    // 로컬 데이터 내보내기
    exportLocalResults() {
        const results = this.getLocalResults();
        const dataStr = JSON.stringify(results, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `calling-assessment-results-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
    }
}

// 사용 예시
const dataCollector = new DataCollector({
    method: 'github', // 또는 'netlify', 'formspree', 'local'
    githubRepo: 'YOUR_USERNAME/calling-assessment-data',
    githubToken: 'YOUR_GITHUB_TOKEN'
});

// 결과 저장 함수
async function saveAssessmentResult(resultData) {
    try {
        const result = await dataCollector.saveResult(resultData);
        console.log('Result saved successfully:', result);
        return result;
    } catch (error) {
        console.error('Failed to save result:', error);
        throw error;
    }
}

// 전역으로 내보내기
window.DataCollector = DataCollector;
window.saveAssessmentResult = saveAssessmentResult;

