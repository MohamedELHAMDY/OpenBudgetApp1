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

    // Add some initial budget data
    this.budgetItems.set(1, {
      id: 1,
      category: "Education",
      amount: 1000000,
      year: 2024,
      description: "Primary education funding"
    });
    this.budgetItems.set(2, {
      id: 2,
      category: "Healthcare",
      amount: 2000000,
      year: 2024,
      description: "Public hospitals and clinics"
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
