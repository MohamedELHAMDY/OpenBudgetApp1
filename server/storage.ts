import { IStorage } from "./types";
import { User, InsertUser, BudgetItem, ForumPost, Survey } from "@shared/schema";
import createMemoryStore from "memorystore";
import session from "express-session";

const MemoryStore = createMemoryStore(session);

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private budgetItems: Map<number, BudgetItem>;
  private forumPosts: Map<number, ForumPost>;
  private surveys: Map<number, Survey>;
  public sessionStore: session.Store;
  private currentId: { [key: string]: number };

  constructor() {
    this.users = new Map();
    this.budgetItems = new Map();
    this.forumPosts = new Map();
    this.surveys = new Map();
    this.currentId = { users: 1, budgetItems: 1, forumPosts: 1, surveys: 1 };
    this.sessionStore = new MemoryStore({ checkPeriod: 86400000 });

    // Add more detailed budget data
    this.budgetItems.set(1, {
      id: 1,
      category: "Éducation",
      amount: 1000000,
      year: 2024,
      description: "Financement de l'éducation primaire",
      quarter: 1,
      region: "Casablanca-Settat",
      program: "Réforme de l'Education",
      type: "operating"
    });

    this.budgetItems.set(2, {
      id: 2,
      category: "Santé",
      amount: 2000000,
      year: 2024,
      description: "Hôpitaux et cliniques publics",
      quarter: 1,
      region: "Rabat-Salé-Kénitra",
      program: "Infrastructure Sanitaire",
      type: "investment"
    });

    this.budgetItems.set(3, {
      id: 3,
      category: "Infrastructure",
      amount: 1500000,
      year: 2024,
      description: "Développement des routes et transport",
      quarter: 1,
      region: "Tanger-Tétouan-Al Hoceïma",
      program: "Connectivité Nationale",
      type: "investment"
    });

    this.budgetItems.set(4, {
      id: 4,
      category: "Agriculture",
      amount: 800000,
      year: 2024,
      description: "Soutien au secteur agricole",
      quarter: 1,
      region: "Fès-Meknès",
      program: "Plan Maroc Vert",
      type: "operating"
    });

    // Add historical data
    this.budgetItems.set(5, {
      id: 5,
      category: "Éducation",
      amount: 950000,
      year: 2023,
      description: "Financement de l'éducation primaire",
      quarter: 4,
      region: "Casablanca-Settat",
      program: "Réforme de l'Education",
      type: "operating"
    });

    this.budgetItems.set(6, {
      id: 6,
      category: "Santé",
      amount: 1800000,
      year: 2023,
      description: "Hôpitaux et cliniques publics",
      quarter: 4,
      region: "Rabat-Salé-Kénitra",
      program: "Infrastructure Sanitaire",
      type: "investment"
    });

    // Add some initial forum posts
    this.forumPosts.set(1, {
      id: 1,
      userId: 1,
      title: "Importance de l'éducation dans le budget 2024",
      content: "Le secteur de l'éducation représente une part importante du budget. Quelles sont vos opinions sur cette allocation?",
      createdAt: new Date()
    });
    this.forumPosts.set(2, {
      id: 2,
      userId: 1,
      title: "Investissements dans la santé publique",
      content: "Discussion sur les nouveaux investissements dans les hôpitaux publics et les centres de santé.",
      createdAt: new Date()
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId.users++;
    const user: User = { ...insertUser, id, role: "user" };
    this.users.set(id, user);
    return user;
  }

  async getBudgetItems(): Promise<BudgetItem[]> {
    return Array.from(this.budgetItems.values());
  }

  async getForumPosts(): Promise<ForumPost[]> {
    return Array.from(this.forumPosts.values());
  }

  async createForumPost(post: Omit<ForumPost, "id" | "createdAt">): Promise<ForumPost> {
    const id = this.currentId.forumPosts++;
    const newPost: ForumPost = {
      ...post,
      id,
      createdAt: new Date()
    };
    this.forumPosts.set(id, newPost);
    return newPost;
  }

  async getSurveys(): Promise<Survey[]> {
    return Array.from(this.surveys.values());
  }

  async createSurvey(survey: Omit<Survey, "id">): Promise<Survey> {
    const id = this.currentId.surveys++;
    const newSurvey: Survey = { ...survey, id };
    this.surveys.set(id, newSurvey);
    return newSurvey;
  }
}

export const storage = new MemStorage();