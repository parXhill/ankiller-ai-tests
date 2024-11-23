import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ParsedResponse {
  // Define ParsedResponse structure here or import it
  keywords: Array<{
    keyword: string;
    translation: string;
    exemplar_sentence: string;
    translation_sentence: string;
  }>;
}

interface PromptState {
  inputMessage: string;
  parsedResponse: ParsedResponse | null;
  isLoading: boolean;
  selectedGroqModel: string;
  numberOfKeywords: number;
  targetLanguage: string;
  languageLevel: string;
  keywordSignificance: string;
  exemplarSentenceLength: number;
  keywordGrammarFormat: string;
  partOfSpeech: string;
}

const initialState: PromptState = {
  inputMessage: 'Встре́ча с медве́дем мо́жет быть о́чень опа́сна. Ру́сские лю́ди лю́бят ходи́ть в лес и собира́ть грибы́ и я́годы. Они́ де́лают э́то с осторо́жностью, так как медве́ди то́же о́чень лю́бят я́годы и мо́гут напа́сть на челове́ка. Медве́дь ест всё: я́годы, ры́бу, мя́со и да́же насеко́мых. Осо́бенно он лю́бит мёд.',
  parsedResponse: null,
  isLoading: false,
  selectedGroqModel: 'llama3-70b-8192',
  numberOfKeywords: 5, // Default value, can be adjusted
  targetLanguage: 'Russian', // Default value, can be adjusted
  languageLevel: 'A2 - Elementary', // Default value, e.g., A1
  keywordSignificance: "Significance is based on the frequency of occurrence in the target language.", // Default value, e.g., 'frequency' or 'relevance'
  exemplarSentenceLength: 8, // Default value, e.g., 8 words
  keywordGrammarFormat: "Keywords must be converted to their standard uninflected grammatical form. E.g. singular, nominative, infinitive, etc.", // Default value, can be adjusted
  partOfSpeech: "Extract any part of speech as keywords.", // Default value, e.g., 'noun'
};

const promptSlice = createSlice({
  name: 'prompt',
  initialState,
  reducers: {
    setInputMessage: (state, action: PayloadAction<string>) => {
      state.inputMessage = action.payload;
    },
    setParsedResponse: (state, action: PayloadAction<ParsedResponse | null>) => {
      state.parsedResponse = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setSelectedGroqModel: (state, action: PayloadAction<string>) => {
      state.selectedGroqModel = action.payload;
    },
    setNumberOfKeywords: (state, action: PayloadAction<number>) => {
      state.numberOfKeywords = action.payload;
    },
    setTargetLanguage: (state, action: PayloadAction<string>) => {
      state.targetLanguage = action.payload;
    },
    setLanguageLevel: (state, action: PayloadAction<string>) => {
      state.languageLevel = action.payload;
    },
    setKeywordSignificance: (state, action: PayloadAction<string>) => {
      state.keywordSignificance = action.payload;
    },
    setExemplarSentenceLength: (state, action: PayloadAction<number>) => {
      state.exemplarSentenceLength = action.payload;
    },
    setKeywordGrammarFormat: (state, action: PayloadAction<string>) => {
      state.keywordGrammarFormat = action.payload;
    },
    setPartOfSpeech: (state, action: PayloadAction<string>) => {
      state.partOfSpeech = action.payload;
    },
  },
});

// Export actions and reducer
export const {
  setInputMessage,
  setParsedResponse,
  setIsLoading,
  setSelectedGroqModel,
  setNumberOfKeywords,
  setTargetLanguage,
  setLanguageLevel,
  setKeywordSignificance,
  setExemplarSentenceLength,
  setKeywordGrammarFormat,
  setPartOfSpeech,
} = promptSlice.actions;

export default promptSlice.reducer;