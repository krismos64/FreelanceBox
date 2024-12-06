export class DashboardService {
  static async getDashboardData(userId: string) {
    // Remplacez cette logique par votre propre implémentation
    return {
      welcomeMessage: `Bienvenue, utilisateur ${userId}`,
      stats: {
        totalInvoices: 42,
        totalQuotes: 10,
        revenue: 12345.67,
      },
    };
  }
}
