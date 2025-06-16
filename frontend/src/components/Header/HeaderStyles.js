export const headerStyles = {
    // Main container styles
    header: "text-black-600 body-font shadow-md bg-white",
    
    // Announcement bar
    announcement: {
      container: "bg-red-600 text-end text-white p-1 text-sm overflow-hidden relative",
      text: "whitespace-nowrap animate-scroll font-sans"
    },
    
    // Main content container
    mainContainer: "container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center",
    
    // Logo section
    logo: {
      container: "flex items-center",
      image: "h-10 w-auto",
      text: "font-roboto text-2xl text-red-800 ml-2 tracking-wide"
    },
    
    // Navigation
    nav: {
      container: "md:ml-auto mr-64 flex flex-wrap items-center justify-center space-x-4 text-sm font-medium",
      link: "px-4 py-2 font-semibold rounded-lg text-pink-600 transition-all duration-300 hover:bg-red-500 hover:text-white hover:-translate-y-1 hover:shadow-lg hover:scale-105"
    },
    
    // Right side elements
    rightSection: {
      container: "flex items-center space-x-9",
      signInButton: "px-2 py-2 bg-red-50 rounded-lg text-red-600 font-semibold transition-all duration-300 hover:bg-red-500 hover:text-white hover:-translate-y-1 hover:shadow-lg hover:scale-105",
      cartIcon: "w-6 h-6 text-blue-500 bg-color-red transition-transform duration-300 hover:text-red-500 hover:scale-110"
    }
  }; 