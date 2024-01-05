interface Dependency {
  generateInstallationUrl: (scopes: string[]) => Promise<string>
}

export const makeSlackDb = ({ generateInstallationUrl }: Dependency) => {
  return {
    getInstallationUrl: async (scopes: string[]) => {
      return await generateInstallationUrl(scopes)
    },
  }
}
