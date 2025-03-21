/// <reference types="vite/client" />
/// <reference types="react" />
/// <reference types="react-dom" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  // mais variáveis de ambiente...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
