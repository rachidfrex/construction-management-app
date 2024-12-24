// src/mockData/db.ts
interface DB {
    users: User[];
    projects: Project[];
    inventory: InventoryItem[];
    activities: Activity[];
  }
  interface TeamMember {
    id: string;
    name: string;
    role: string;
  }
  
  const initialDB: DB = {
    users: [
      {
        id: 1,
        name: "Rachid Bouhaya",
        email: "rachid@gmail.com",
        password: "rachid", // In real app, this would be hashed
        role: "admin",
        createdAt: "2024-01-01"
      }
    ],
    projects: [
      {
        id: 1,
        name: "Construction Site A",
        description: "Main building construction project in downtown area",
        clientName: "ABC Corporation",
        startDate: "2024-01-15",
        endDate: "2024-06-30",
        status: "In Progress",
        type: "Construction",
        progress: 45,
        budget: 1500000,
        materialsUsed: 25,
        team: [
          { id: "1", name: "Karim Alami", role: "مدير المشروع" },
          { id: "2", name: "Amina Benali", role: "مهندس موقع" },
          { id: "3", name: "Hassan El Fassi", role: "مهندس معماري" },
          { id: "4", name: "Fatima Zahra", role: "مدير البناء" }
        ],
        materials: [
          { id: 1, name: "Cement", quantity: 1000, unit: "bags", used: 450 },
          { id: 2, name: "Steel", quantity: 500, unit: "tons", used: 200 },
          { id: 3, name: "Bricks", quantity: 50000, unit: "pieces", used: 20000 }
        ]
      }
      // Add more mock projects
    ],
    inventory: [
      {
        id: 1,
        name: "Cement",
        quantity: 500,
        unit: "bags",
        value: 25000,
        minimumStock: 100,
        reorderPoint: 200,
        supplier: "ABC Suppliers",
        lastRestocked: "2024-01-15",
        category: "Basic Materials",
        status: "In Stock"
      }
      // Add more inventory items
    ],
    activities: [
      {
        id: 1,
        userId: 1,
        type: "project",
        action: "created",
        target: "Construction Site A",
        timestamp: new Date().toISOString(),
        link: "/projects/1"
      }
      // Add more activities
    ]
  };
  
  // Create a simple storage service
  export class StorageService {
    private static instance: StorageService;
    private db: DB;
  
    // private constructor() {
    //   // Load data from localStorage if exists, else use initialDB
    //   const stored = localStorage.getItem('appDB');
    //   this.db = stored ? JSON.parse(stored) : initialDB;
    // }
    private constructor() {
      // Get stored data or use initial data
      const stored = localStorage.getItem('appDB');
      this.db = stored ? JSON.parse(stored) : {
        projects: [
          {
            id: 1,
            name: "Construction Site A",
            description: "Main building construction project in downtown area",
            clientName: "ABC Corporation",
            startDate: "2024-01-15",
            endDate: "2024-06-30",
            status: "In Progress",
            type: "Construction",
            team: [
              { id: "1", name: "Karim Alami", role: "مدير المشروع" },
              { id: "2", name: "Amina Benali", role: "مهندس موقع" },
              { id: "3", name: "Hassan El Fassi", role: "مهندس معماري" },
              { id: "4", name: "Fatima Zahra", role: "مدير البناء" }
            ],
            progress: 45,
            budget: 1500000,
            materialsUsed: 25,
            materials: [
              { id: 1, name: "Cement", quantity: 1000, unit: "bags", used: 450 },
              { id: 2, name: "Steel", quantity: 500, unit: "tons", used: 200 },
              { id: 3, name: "Bricks", quantity: 50000, unit: "pieces", used: 20000 }
            ]
          }
        ],
      };
    }
  
  
    // static getInstance(): StorageService {
    //   if (!StorageService.instance) {
    //     StorageService.instance = new StorageService();
    //   }
    //   return StorageService.instance;
    // }
    static getInstance(): StorageService {
      if (!StorageService.instance) {
        StorageService.instance = new StorageService();
      }
      return StorageService.instance;
    }
    getProject(id: number) {
      const project = this.db.projects.find(p => p.id === id);
      if (!project) {
        throw new Error('Project not found');
      }
      return project;
    }
  
    // getProjects() {
    //   return this.db.projects;
    // }
  
    // Save changes to localStorage
    private persist() {
      localStorage.setItem('appDB', JSON.stringify(this.db));
    }
  
    // CRUD operations for users
    getUsers() {
      return this.db.users;
    }
  
    createUser(user: Omit<User, 'id'>) {
      const newUser = {
        ...user,
        id: this.db.users.length + 1
      };
      this.db.users.push(newUser);
      this.persist();
      return newUser;
    }
  
    // CRUD operations for projects
    getProjects() {
      return this.db.projects;
    }
  
    createProject(project: Omit<Project, 'id'>) {
      const newProject = {
        ...project,
        id: this.db.projects.length + 1
      };
      this.db.projects.push(newProject);
      this.addActivity({
        userId: 1, // Default user
        type: 'project',
        action: 'created',
        target: project.name,
        link: `/projects/${newProject.id}`
      });
      this.persist();
      return newProject;
    }
    deleteProject(id: number) {
        this.db.projects = this.db.projects.filter(p => p.id !== id);
        this.addActivity({
          userId: 1,
          type: 'project',
          action: 'deleted',
          target: `Project ${id}`,
          link: '/projects'
        });
        this.persist();
      }
    
      archiveProject(id: number) {
        const project = this.db.projects.find(p => p.id === id);
        if (project) {
          project.status = 'Archived';
          this.addActivity({
            userId: 1,
            type: 'project',
            action: 'archived',
            target: project.name,
            link: `/projects/${id}`
          });
          this.persist();
        }
      }
    // CRUD operations for inventory
    getInventory() {
      return this.db.inventory;
    }
  
    updateInventory(item: InventoryItem) {
      const index = this.db.inventory.findIndex(i => i.id === item.id);
      if (index >= 0) {
        this.db.inventory[index] = item;
        this.addActivity({
          userId: 1,
          type: 'inventory',
          action: 'updated',
          target: item.name,
          link: '/inventory'
        });
        this.persist();
      }
    }
  
    // Activity logging
    addActivity(activity: Omit<Activity, 'id' | 'timestamp'>) {
      const newActivity = {
        ...activity,
        id: this.db.activities.length + 1,
        timestamp: new Date().toISOString()
      };
      this.db.activities.unshift(newActivity); // Add to beginning
      if (this.db.activities.length > 50) {
        this.db.activities.pop(); // Keep only last 50 activities
      }
      this.persist();
      return newActivity;
    }
  
    getActivities() {
      return this.db.activities;
    }
  
    // Reset database to initial state
    reset() {
      this.db = initialDB;
      this.persist();
    }
  }
  
  export const storage = StorageService.getInstance();
  storage.reset();
  