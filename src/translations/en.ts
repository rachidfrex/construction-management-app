// src/translations/en.ts
export const en = {
    common: {
        loading: "Loading...",
        save: "Save",
        cancel: "Cancel",
        delete: "Delete",
        edit: "Edit",
        add: "Add",
        search: "Search",
        filter: "Filter",
        export: "Export",
        print: "Print",
        status: "Status",
        actions: "Actions",
        viewAll: "View All",
        backToHome: "Back to Home",
        welcomeBack: "Welcome back",
        errorOccurred: "Something went wrong. Please try again",
         appName: "Bouhaja Sarl",
        logout: "Logout",
        completed: "Completed",

      },
      auth: {
        welcomeBack: "Welcome back",
        pleaseSignIn: "Please sign in to your account",
        email: "Email",
        password: "Password",
        enterEmail: "Enter your email",
        enterPassword: "Enter your password",
        rememberMe: "Remember me",
        forgotPassword: "Forgot password?",
        login: "Sign in",
        signInWith: "Or continue with",
        dontHaveAccount: "Don't have an account?",
        register: "Sign up",
        loginSuccess: "Login successful! Welcome back.",
        invalidCredentials: "Invalid email or password",
        allFieldsRequired: "All fields are required",
        resetPassword: "Reset Password",
        newPassword: "New Password",
        confirmPassword: "Confirm Password",
        alreadyHaveAccount: "Already have an account?",
        backToLogin: "Back to Login",
        resetInstructions: "Enter your email to receive reset instructions",
        createAccount: "Create an account",
        startJourney: "Start your journey with us today",
        fullName: "Full Name",
        enterFullName: "Enter your full name",
        createPassword: "Create a password",
        passwordLength: "Password must be at least 6 characters long",
        invalidEmail: "Please enter a valid email address",
        registerSuccess: "Account created successfully!",
        registerError: "Failed to create account. Please try again.",
        resetLinkSent: "Reset link sent! Please check your inbox.",
        emailRequired: "Email is required",
        setNewPassword: "Set New Password",
        pleaseEnterNewPassword: "Please enter your new password",
        enterNewPassword: "Enter new password",
        confirmNewPassword: "Confirm new password",
        updatePassword: "Update Password",
        updatingPassword: "Updating Password...",
        passwordsDoNotMatch: "Passwords do not match",
        passwordUpdated: "Password updated successfully!",
        updatePasswordError: "Failed to update password. Please try again.",
        back: "Back",
        verifyCode: "Verify Code",
        enterVerificationCode: "Enter the 6-digit code sent to your email",
        enterFullCode: "Please enter all 6 digits",
        codeVerified: "Code verified successfully!",
        invalidCode: "Invalid verification code",
        verifying: "Verifying...",
        noCodeReceived: "Didn't receive the code?",
        resendCode: "Resend",
        newCodeSent: "New code sent!"
        
        
      },

  
    dashboard: {
      title: "Dashboard",
      welcome: "Welcome back, here's what's happening today.",
       fromLastMonth: "from last month",
       monthlyRevenue: "Monthly Revenue",
      lastSevenDays: "Last 7 days",
      lastThirtyDays: "Last 30 days",
      lastNinetyDays: "Last 90 days",
      chartPlaceholder: "Chart coming soon",
      statistics: {
        totalProducts: "Total Products",
        totalValue: "Total Value",
        activeProjects: "Active Projects",
        teamMembers: "Team Members",
        totalSales: "Total Sales",
        monthlyRevenue: "Monthly Revenue",
        inventory: "Inventory",
        orders: "Orders"
      }
    },
    sidebar: {
      main: "Main",
      dashboard: "Dashboard",
      projects: "Projects",
      management: "Management",
      inventory: "Inventory",
      sales: "Sales",
      system: "System",
      users: "Users",
      notifications: "Notifications",
      settings: "Settings"
    },
    header: {
      dashboard: "Dashboard",
      search: "Search...",
      profile: "Profile",
      settings: "Settings",
      help: "Help",
      logout: "Logout",
      userName: "Rachid Bouhaya",
      userEmail: "rachid@gmail.com"
    },
  
    inventory: {
      title: "Inventory Management",
      overview: "Inventory Overview",
      viewCritical: "View Critical Items",
      criticalItems: "Critical Items",
      subtitle: "Manage construction materials and fertilizers inventory",
      table: {
        item: "Item",
        currentStock: "Current Stock",
        monthlyUsage: "Monthly Usage",
        supplier: "Supplier",
        status: "Status",
        lastRestock: "Last Restock"
      },
      construction: {
        title: "Construction Materials",
        subtitle: "Manage your construction materials inventory",
        addMaterial: "Add Material",
        categories: {
          all: "All Categories",
          basicMaterials: "Basic Materials",
          metals: "Metals",
          wood: "Wood",
          concrete: "Concrete",
          tools: "Tools",
        },
      },
      fertilizers: {
        title: "Fertilizers",
        subtitle: "Manage your fertilizers inventory",
      },
      status: {
        instock: "In Stock",
        outofstock: "Out of Stock",
        expiringsoon: "Expiring Soon",
        lowstock : "Low Stock"
      },
      metrics: {
        totalValue: "Total Value",
        currentStock: "Total items in stock",
        criticalItems: "Critical Items",
        belowMinimum: "Items below minimum level",
        reorderNeeded: "Reorder Needed",
        itemsToReorder: "Items to reorder soon",
        usageTrend: "Usage Trend",
        monthlyConsumption: "Monthly consumption rate"
      },
      items: {
        cement: "Cement",
        steel: "Steel",
        paint: "Paint"
      },
      units: {
        bags: "bags",
        tons: "tons",
        gallons: "gallons"
      }
    },
  
    projects: {
      title: "Projects Overview",
      subtitle: "Manage and monitor your construction projects",
      newProject: "New Project",
      projectDetails: "Project Details",
      recentProjects: "Recent Projects",
      viewDetails: "View Details",
      members: "members",
      tasks: "Tasks",
      progress: "Progress",
      status: {
        inProgress: "In Progress",
        completed: "Completed",
        delayed: "Delayed",
        canceled: "Canceled"
      },
      sampleData: {
        projectA: "Construction Site A",
        projectB: "Renovation Project B",
        projectC: "Maintenance Work C"
      },
      tabs: {
        overview: "Overview",
        timeline: "Timeline",
        team: "Team",
        materials: "Materials",
        documents: "Documents"
      },
      form: {
        projectName: "Project Name",
        clientName: "Client Name",
        projectType: "Project Type",
        startDate: "Start Date",
        endDate: "End Date",
        budget: "Budget",
        description: "Description",
        teamMembers: "Team Members",
        materials: "Materials"
      }
    },
    activity: {
      recentActivity: "Recent Activity",
      refresh: "Refresh",
      viewAll: "View All Activities",
      users: {
        johnDoe: "John Doe",
        janeSmith: "Jane Smith"
      },
      actions: {
        createdProject: "created new project",
        updatedInventory: "updated inventory",
        generatedReport: "generated report",
        completedMilestone: "completed milestone",
        addedTeamMember: "added team member"
      },
      targets: {
        constructionA: "Construction Site A",
        steelBars: "Steel Bars",
        monthlySales: "Monthly Sales",
        foundationWork: "Foundation Work",
        projectAlpha: "Project Alpha"
      }
    }
  };
  

