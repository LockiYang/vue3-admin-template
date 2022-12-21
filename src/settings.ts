interface DefaultSettings {
  title: string;
  showSettings: boolean;
  tagsView: boolean;
  fixedHeader: boolean;
  sidebarLogo: boolean;
  errorLog: string;
}

const defaultSettings: DefaultSettings = {
  title: "vue3-admin-element",
  showSettings: true,
  tagsView: true,
  fixedHeader: false,
  sidebarLogo: true,
  errorLog: "production",
};

export default defaultSettings;
