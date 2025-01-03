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
        next : "Next",
        previous: "Previous",
        backToProjects: "Back to Projects",
        projects: "Projects",
        refresh: "Refresh",

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
        newCodeSent: "New code sent!",
        logoutSuccess: "Logged out successfully",
        logoutError: "Error logging out",
        loggingOut: "Logging out...",
        passwordStrength: {
          weak: 'Weak',
          medium: 'Medium',
          good: 'Good',
          strong: 'Strong'
        },
        passwordChecks: {
          length: 'At least 8 characters',
          number: 'Contains a number',
          lower: 'Contains lowercase letter',
          upper: 'Contains uppercase letter',
          special: 'Contains special character'
        }
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
      quickTasks: "Quick Tasks",
      createNewProject: "Create New Project",
      updateInventory: "Update Inventory",
      generateReport: "Generate Report",
      viewAllTasks: "View All Tasks",
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
        lastRestock: "Last Restock",
        category: "Category",
        stock: "Stock",
        value: "Value",
        warehouse: "Warehouse",
        actions: "Actions",
        material: "Material",
        type: "Type",
        expiryDate: "Expiry Date",
        composition: "Composition",
        storageConditions: "Storage Conditions",
        unit: "Unit",
        price: "Price",
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
        uploadImage: "Upload Image",
        dragDrop: "or drag and drop image here",
      },
      fertilizers: {
        title: "Fertilizers",
        subtitle: "Manage your fertilizers inventory",
        addFertilizer: "Add Fertilizer",
        types: {
          chemical: "Chemical",
          organic: "Organic",
          mineral: "Mineral",
          biofertilizer: "Biofertilizer"
        },
        expiryDate: "Expiry Date",
        composition: "Composition",
        storage: {
          conditions: "Storage Conditions",
          temperature: "Temperature",
          humidity: "Humidity"
        }
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
        gallons: "gallons",
        pieces: "pieces",
        meters: "meters",
      },
      searchPlaceholder: "Search inventory...",
      filters: {
        allCategories: "All Categories",
        construction: "Construction Materials",
        fertilizers: "Fertilizers",
        allSuppliers: "All Suppliers",
        allStatuses: "All Statuses"
      },
      sort: {
        name: "Sort by Name",
        quantity: "Sort by Quantity",
        value: "Sort by Value"
      },
      timeRange: {
        week: "Last 7 Days",
        month: "Last 30 Days",
        quarter: "Last 90 Days"
      },
      statistics: {
        totalProducts: "Total Products",
        lowStock: "Low Stock Items",
        totalValue: "Total Value",
        recentMovements: "Recent Movements",
        expiringSoon: "Expiring Soon"
      },
      transactions: {
        title: "Recent Transactions",
        viewAll: "View All",
        type: "Type",
        product: "Product",
        quantity: "Quantity",
        date: "Date",
        supplier: "Supplier/Warehouse",
        incoming: "Incoming",
        outgoing: "Outgoing",
        supplierWarehouse: "Supplier/Warehouse"
      },
      alerts: {
        title: "Low Stock Alerts",
        viewAll: "View All Alerts",
        critical: "Critical",
        current: "Current",
        minimum: "Minimum",
        lastOrder: "Last Order",
        placeOrder: "Place Order"
      },
      quickActions: {
        title: "Quick Actions",
        comingSoon: "Quick actions menu coming soon!"
      },
      lowStock: {
        title: "Low Stock Items",
        viewAll: "View All Low Stock Items",
        critical: "Critical",
        current: "Current Stock",
        minimum: "Minimum Required",
        lastOrder: "Last Order Date",
      },
      priceRange: {
        min: "Min Price",
        max: "Max Price"
      },
      bulkActions: {
        title: "Bulk Actions",
        selected: "selected",
        deleteSelected: "Delete Selected",
        editSelected: "Edit Selected"
      },
      quickLinks: {
        manage: "Manage Inventory",
        orders: "Orders",
        reports: "Reports"
      },
      minimumStock: "Minimum Stock Level",
      description: "Description",
      selectUnit: "Select Unit",
      messages: {
        success: {
          materialAdded: "Material added successfully"
        },
        error: {
          addMaterial: "Failed to add material"
        }
      },
      placeholders: {
        materialName: "Enter material name",
        description: "Enter material description..."
      }
    },
  
    projects: {
      client: "Client",
      create: "Create Project",
      title: "Projects Overview",
      subtitle: "Manage and monitor your construction projects",
      newProject: "New Project",
      projectDetails: "Project Details",
      recentProjects: "Recent Projects",
      viewDetails: "View Details",
      members: "members",
      tasks: "Tasks",
      progress: "Progress",
      noResults: "No projects found matching your criteria",
      quickAccess: "Quick Access",
      quickAccessDescription: "View projects by their current status or manage your active projects",
     
      

      budget: "Budget",
      duration: "Duration",
      teamSize: "Team Size",
      materialsUsed: "Materials Used",
      items: "items",
      team: "Team",
      materials: {
        add: "Add Material",
        name: "Material Name",
        quantity: "Quantity",
        status: "Status",
        usage: "Usage",
        noMaterials: "No materials added to this project"
      },
      manageMaterials: "Manage Materials",
      manageTeam: "Manage Team",
      description: "Description",
      viewTimeline: "View Timeline",
      timeline : "Timeline", 

      filters: {
        title: "Filter Projects",
        clear: "Clear Filters",
        status: "Status",
        type: "Project Type",
        startDate: "Start Date",
        endDate: "End Date",
        searchPlaceholder: "Search projects...",
        allStatuses: "All Statuses",
        allTypes: "All Types",
        dateRange: "Date Range",
        activeFilters: "Active Filters",
        from: "From",
        to: "To"
      },
      status: {
        inprogress: "In Progress",
        completed: "Completed",
        delayed: "Delayed",
        canceled: "Canceled",
        pending: "Pending"
      },
      types: {
        construction: "Construction",
        renovation: "Renovation",
        maintenance: "Maintenance"
      },
      statistics: {
        title: "Project Statistics",
        total: "Total Projects",
        inProgress: "In Progress",
        completed: "Completed",
        delayed: "Delayed",
        canceled: "Canceled",
        totalBudget: "Total Budget",
        averageProgress: "Average Progress"
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
        documents: "Documents",
        tasks: "Tasks",
        budget: "Budget",
        gallery: "Gallery",
        files: "Files"
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
        materials: "Materials",
        location: "Location",
        priority: "Priority",
        attachments: "Attachments",
        milestones: "Project Milestones",
        addMilestone: "Add Milestone",
        uploadFiles: "Upload Files",
        
        steps: {
          general: "General Information",
          resources: "Resources",
          schedule: "Schedule",
          details: "Additional Details"
        },
        placeholders: {
          projectName: "Example: School Building Construction",
          clientName: "Enter client name",
          budget: "Example: 200,000",
          description: "Enter project description and additional notes...",
          searchTeam: "Search team members...",
          searchMaterials: "Search materials...",
          milestoneTitle: "Milestone title",
          attachments: "PDF, DOC, JPG, PNG (Max 10MB per file)",
          selectType: "Select project type",
          startDate: "Select start date",
          endDate: "Select end date",
           milestoneDate: "Select milestone date"

        },
      },
     
      validation: {
        nameRequired: "Project name is required",
        typeRequired: "Project type is required",
        clientRequired: "Client name is required", 
        materialsRequired: "At least one material is required",
        teamRequired: "At least one team member is required",
        datesRequired: "Project dates are required",
        invalidDates: "End date must be after start date",
        budgetRequired: "Budget is required",
        descriptionRequired: "Project description is required",
         milestoneDateRange: "Milestone date must be within project duration"
      },
      actions: {
        title: "Actions",
        edit: "Edit Project",
        delete: "Delete Project",
        archive: "Archive Project",
        export: "Export",
        import: "Import",
        viewDetails: "View Details",
        addMember: "Add Member",
        removeMember: "Remove Member",
        uploadFiles: "Upload Files",
        generateReport: "Generate Report",
        editProject: "Edit Project",
        timeline: "Timeline",
        team: "Team",
        material: "Materials",
        documents: "Documents",
      },
      messages: {
        deleteConfirm: "Are you sure you want to delete this project?",
        archiveConfirm: "Are you sure you want to archive this project?",
        archived: "Project archived successfully",
        deleted: "Project deleted successfully",
        noFiles: "No files uploaded yet",
        success: {
          created: "Project created successfully",
          updated: "Project updated successfully",
          deleted: "Project deleted successfully",
          archived: "Project archived successfully",
          memberAdded: "Team member added successfully",
          memberRemoved: "Team member removed successfully",
          filesUploaded: "Files uploaded successfully"
        },
        error: {
          create: "Failed to create project",
          update: "Failed to update project",
          delete: "Failed to delete project",
          archive: "Failed to archive project",
          notFound: "Project not found",
        }
      },
      details: {
        description: "Description",
        projectDetails: "Project Details",
        type: "Project Type",
        client: "Client",
        startDate: "Start Date",
        endDate: "End Date",
        teamMembers: "Team Members",
        timeline: "Timeline",
        materials: "Materials",
        documents: "Documents"
      },

      complete: "Complete",
   
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
      ,
     
    },
    modals: {
      common: {
        cancel: "Cancel",
        confirm: "Confirm",
      },
      delete: {
        title: "Delete Project",
        message: "Are you sure you want to delete this project? This action cannot be undone.",
        confirmButton: "Delete Project"
      },
      archive: {
        title: "Archive Project",
        message: "Are you sure you want to archive this project? You can restore it later.",
        confirmButton: "Archive Project"
      }
    },
    materials: {
      source: {
        label: "Material Source",
        internal: "Internal",
        purchase: "Purchase"
      },
      selection: {
        label: "Required Materials"
      },
      available: "Available",
      quantity: "Quantity ({unit})",
      summary: {
        title: "Material Status Summary"
      },
      errors: {
        notFound: "Material not found",
        negativeQuantity: "Quantity cannot be negative",
        insufficientStock: "Only {stock} {unit} available in stock",
        insufficient: "Insufficient stock"
      },
      noSelection: "No materials selected"
    },
    editProject: {
      title: 'Edit Project',
      generalInfo: 'General Information',
      description: 'Description',
      materials: 'Materials',
      progress: 'Project Progress',
      financial: 'Financial Overview',
      teamMembers: 'Team Members',
      files: 'Files & Documents',
      dangerZone: 'Danger Zone',
      addMember: 'Add Member',
      uploadFiles : 'Upload Files',
      form: {
        projectName: 'Project Name',
        clientName: 'Client Name',
        startDate: 'Start Date',
        endDate: 'End Date',
        budget: 'Budget',
        descriptionPlaceholder: 'Enter project description...',
      },
      buttons: {
        save: 'Save Changes',
        saving: 'Saving Changes...',
        addMaterial: 'Add Material',
        addMember: 'Add Member',
        uploadFiles: 'Upload Files',
        deleteProject: 'Delete Project',
      },
      dropzone: {
        text: 'or drag and drop files here'
      },
      status: {
        'on-track': 'On Track',
        onTrack: 'On Track',
        delayed: 'Delayed',
        ahead: 'Ahead',
        inStock: 'In Stock',
        lowStock: 'Low Stock',
        outOfStock: 'Out of Stock'
      },
      messages: {
        success: {
          updated: 'Project updated successfully!',
        },
        error: {
          fetch: 'Failed to fetch project details',
          update: 'Failed to update project',
        }
      },
      projectProgress: 'Project Progress',
      financialOverview: 'Financial Overview',
      filesDocuments: 'Files & Documents',
      addTransaction: 'Add Transaction',
      dragDropFiles: 'or drag and drop files here',
      expenseAmount: '$',
      milestones: 'Project Milestones',
      addMilestone: 'Add Milestone',
      noFiles: 'No files uploaded yet',
      confirmDelete: 'Are you sure you want to delete this project?',
      transactionStatus: {
        pending: 'Pending',
        completed: 'Completed',
        cancelled: 'Cancelled'
      },
      transactionTypes: {
        expense: 'Expense',
        payment: 'Payment'
      }
    },
    
    
  };


