declare module '@/utilities/jlpt_with_examples.json' {
  export type Example = {
    'jp': string,
    'pronunciations': string[],
    'voice_code': string,
    'voice_file': string,
    'kr': string
  };

  export type Entity = {
    'entry': string,
    'entry_split': string[],
    'pronunciation': string,
    'meanings': string[],
    'part_of_speech': string,
    'level': number,
    'examples': Example[]
  };

  // export type JLPTLevelData = Record<string, Entity>;

  const data:Entity[];
  export default data;
}