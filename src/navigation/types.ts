import { NavigatorScreenParams } from '@react-navigation/native';

export type SignalerStackParamList = {
  Home: undefined;
  Panne: undefined;
  Locate: undefined;
  Select: undefined;
  Recap: undefined;
};

export type SuiviStackParamList = {
  Track: undefined;
  Done: undefined;
  Chat: undefined;
  Assist: undefined;
};

export type MainTabParamList = {
  Signaler: NavigatorScreenParams<SignalerStackParamList>;
  Historique: undefined;
  Suivi: NavigatorScreenParams<SuiviStackParamList>;
  Profil: undefined;
};

export type ProDemandesStackParamList = {
  ProDash: undefined;
  ProReq: undefined;
  ProNav: undefined;
  ProChat: undefined;
  ProAssist: undefined;
};

export type ProTabParamList = {
  Demandes: NavigatorScreenParams<ProDemandesStackParamList>;
  Revenus: undefined;
  ProfilPro: undefined;
};

export type AdminDossiersStackParamList = {
  DossierList: undefined;
  DossierDetail: undefined;
};

export type AdminLitigesStackParamList = {
  LitigeList: undefined;
  LitigeDetail: undefined;
};

export type AdminTabParamList = {
  Apercu: undefined;
  Dossiers: NavigatorScreenParams<AdminDossiersStackParamList>;
  Litiges: NavigatorScreenParams<AdminLitigesStackParamList>;
  Finances: undefined;
};

export type RootStackParamList = {
  Splash: undefined;
  Role: undefined;
  SignupClient: undefined;
  SignupPro: undefined;
  ProPending: undefined;
  ProMain: NavigatorScreenParams<ProTabParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
  AdminMain: NavigatorScreenParams<AdminTabParamList>;
};
