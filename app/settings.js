import { globalShortcut } from 'electron';
import settings from 'electron-settings';
import { defaultsDeep } from 'lodash';

const DEFAULT_SETTINGS = {
  fontSizeModifier: 0
};

export const setDefaultSettings = (defaultSettings = DEFAULT_SETTINGS) => {
  const currentSettings = settings.getAll();
  const settingsWithDefaults = defaultsDeep({}, currentSettings, defaultSettings);
  settings.setAll(settingsWithDefaults);
};

export const setupShortcuts = () => {
  globalShortcut.register('CmdOrCtrl+=', increaseFontSizeModifier);
  globalShortcut.register('CmdOrCtrl+-', decreaseFontSizeModifier);
  globalShortcut.register('CmdOrCtrl+0', resetFontSizeModifier);
};

const increaseFontSizeModifier = (defaultFontSizeModifier = DEFAULT_SETTINGS.fontSizeModifier) => {
  const currentFontSizeModifier = settings.get('fontSizeModifier', defaultFontSizeModifier);
  settings.set('fontSizeModifier', currentFontSizeModifier + 1);
};

const decreaseFontSizeModifier = (defaultFontSizeModifier = DEFAULT_SETTINGS.fontSizeModifier) => {
  const currentFontSizeModifier = settings.get('fontSizeModifier', defaultFontSizeModifier);
  settings.set('fontSizeModifier', currentFontSizeModifier - 1);
};

const resetFontSizeModifier = (defaultFontSizeModifier = DEFAULT_SETTINGS.fontSizeModifier) => {
  settings.set('fontSizeModifier', defaultFontSizeModifier);
};
