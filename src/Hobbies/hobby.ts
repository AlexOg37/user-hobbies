export type PassionLevel = 'Low' | 'Medium' | 'High' | 'Very-High';

export type Hobby = {
  id: number;
  userId: number;
  passionLevel: PassionLevel;
  description: string;
  since: string;
}
