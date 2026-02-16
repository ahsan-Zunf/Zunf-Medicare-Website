import { getLabs, getLabTests, type Lab, type LabTest } from "./api";

export interface SearchResult {
  type: 'lab' | 'test';
  labId: string;
  labName: string;
  testId?: string;
  testName?: string;
  testDescription?: string;
  price?: number | null;
  discountedPrice?: number | null;
}

export async function searchLabsAndTests(query: string): Promise<SearchResult[]> {
  if (!query.trim()) {
    return [];
  }

  const searchQuery = query.toLowerCase().trim();
  const results: SearchResult[] = [];

  try {
    // Search labs
    const labs = await getLabs();
    const matchingLabs = labs.filter(
      (lab) =>
        lab.name.toLowerCase().includes(searchQuery) ||
        lab.description?.toLowerCase().includes(searchQuery)
    );

    matchingLabs.forEach((lab) => {
      results.push({
        type: 'lab',
        labId: lab.id,
        labName: lab.name,
      });
    });

    // Search tests from all labs
    const labSearchPromises = labs.map(async (lab) => {
      try {
        const labData = await getLabTests(lab.id);
        if (labData && labData.tests) {
          const matchingTests = labData.tests.filter(
            (test) =>
              test.name.toLowerCase().includes(searchQuery) ||
              test.description?.toLowerCase().includes(searchQuery)
          );

          return matchingTests.map((test) => ({
            type: 'test' as const,
            labId: lab.id,
            labName: lab.name,
            testId: test.id,
            testName: test.name,
            testDescription: test.description,
            price: test.price,
            discountedPrice: test.discounted_price,
          }));
        }
      } catch (error) {
        console.error(`Error fetching tests for ${lab.id}:`, error);
      }
      return [];
    });

    const testResults = await Promise.all(labSearchPromises);
    testResults.flat().forEach((test) => {
      results.push(test);
    });
  } catch (error) {
    console.error('Error searching:', error);
  }

  return results;
}



