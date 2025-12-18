import curriculumData from '../../it_r22_curriculum.json';

export type SubjectType = 'theory' | 'lab';

export interface Subject {
  code: string;
  name: string;
  credits: number;
  type: SubjectType;
}

export interface SemesterData {
  name: string;
  totalCredits: number;
  subjects: Subject[];
}

export interface CurriculumData {
  branch: string;
  regulation: string;
  years: {
    [key: string]: SemesterData;
  };
}

// Type assertion for imported JSON
const curriculum = curriculumData as CurriculumData;

// Get specific semester data
export const getSemesterData = (semesterKey: string): SemesterData | null => {
  return curriculum.years[semesterKey] || null;
};

// Get 2-1 semester (hardcoded for v1)
export const getCurrentSemester = (): SemesterData => {
  const semester = curriculum.years['2-1'];
  if (!semester) {
    throw new Error('Semester 2-1 not found in curriculum data');
  }
  return semester;
};

// Get branch and regulation info
export const getBranchInfo = () => ({
  branch: curriculum.branch,
  regulation: curriculum.regulation,
});

export default curriculum;
