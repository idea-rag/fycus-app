interface SchoolInfo {
    name: string;
    locate: string;
}

export async function schoolRequest(schoolName: string): Promise<SchoolInfo | null> {
    try {
        const response = await fetch(`https:
        const data = await response.json();

        
        if (data?.schoolInfo?.length > 0) {
            const school = data.schoolInfo; 
            return {
                name: school.SCHUL_NM,   
                locate: school.ORG_RDNMA, 
            };
        }

        
        return null;
    } catch (error) {
        console.error("Error fetching school info:", error);
        return null;
    }
}