export type SpeechMock = {
  _onStart: () => void;
  _onStopped: () => void;
  _onDone: () => void;
  _onError: () => void;
  _onPause: () => void;
  _onResume: () => void;
  _isSpeaking: boolean;
  _reset: () => void;

  speak: jest.Mock;
  pause: jest.Mock;
  resume: jest.Mock;
  stop: jest.Mock;
  isSpeakingAsync: jest.Mock;

  startSpeaking: () => void;
  finishSpeaking: () => void;
  errorSpeaking: () => void;

  reset: () => void;
  mockClear: () => void;
};

const speech: SpeechMock = {
  _onStart: () => null,
  _onStopped: () => null,
  _onDone: () => null,
  _onError: () => null,
  _onPause: () => null,
  _onResume: () => null,
  _isSpeaking: false,
  _reset: () => {
    speech._onStart = () => null;
    speech._onStopped = () => null;
    speech._onDone = () => null;
    speech._onError = () => null;
    speech._onPause = () => null;
    speech._onResume = () => null;
    speech._isSpeaking = false;
  },

  speak: jest
    .fn()
    .mockImplementation(
      (
        _,
        {
          onStart = () => null,
          onStopped = () => null,
          onDone = () => null,
          onError = () => null,
          onPause = () => null,
          onResume = () => null
        } = {}
      ) => {
        speech._onStart = onStart;
        speech._onStopped = onStopped;
        speech._onDone = onDone;
        speech._onError = onError;
        speech._onPause = onPause;
        speech._onResume = onResume;
      }
    ),

  pause: jest.fn().mockImplementation(() => {
    speech._onPause();
  }),

  resume: jest.fn().mockImplementation(() => {
    speech._onResume();
  }),

  stop: jest.fn().mockImplementation(() => {
    speech._onStopped();
  }),

  isSpeakingAsync: jest.fn().mockImplementation(() => {
    return Promise.resolve(speech._isSpeaking);
  }),

  startSpeaking: () => {
    speech._isSpeaking = true;
    speech._onStart();
  },

  finishSpeaking: () => {
    speech._isSpeaking = false;
    speech._onDone();
  },

  errorSpeaking: () => {
    speech._isSpeaking = false;
    speech._onError();
  },

  mockClear: () => {
    speech.speak.mockClear();
    speech.pause.mockClear();
    speech.resume.mockClear();
    speech.stop.mockClear();
    speech.isSpeakingAsync.mockClear();
  },

  reset: () => {
    speech._reset();
    speech.mockClear();
  }
};

export default speech;
