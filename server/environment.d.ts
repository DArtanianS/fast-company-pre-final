declare global {
   namespace NodeJS {
      interface ProcessEnv {
         NODE_ENV?: 'development' | 'production'
         PORT?: string
         MONGO_URI?: string
         DB_NAME?: string
         DB_PASS?: string
         ACCESS_SECRET?: string
         REFRESH_SECRET?: string
      }
   }
}

 // If this file has no import/export statements (i.e. is a script)
 // convert it into a module by adding an empty export statement.
export {}