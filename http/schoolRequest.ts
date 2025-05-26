interface SchoolInfo {
    name: string;
    locate: string;
}

export async function schoolRequest(schoolName: string): Promise<SchoolInfo | null> {
    try {
        const response = await fetch(`https://open.neis.go.kr/hub/schoolInfo?KEY=5996d41e98cf4cf19eb69559a903d8f5&Type=json&SCHUL_NM=${encodeURIComponent(schoolName)}`);
        const data = await response.json();

        // 데이터가 정상적으로 응답되었는지 확인
        if (data?.schoolInfo?.length > 0) {
            const school = data.schoolInfo; // 첫 번째 학교 정보 사용
            return {
                name: school.SCHUL_NM,   // 학교 이름
                locate: school.ORG_RDNMA, // 주소
            };
        }

        // 데이터가 없을 경우 null 반환
        return null;
    } catch (error) {
        console.error("Error fetching school info:", error);
        return null;
    }
}