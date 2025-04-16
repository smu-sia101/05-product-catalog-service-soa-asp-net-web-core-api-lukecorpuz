using Google.Cloud.Firestore;

namespace SIA_API_PRODCAT.Models
{
    [FirestoreData]
    public class Product
    {
        [FirestoreProperty]
        public string Id { get; set; }
        [FirestoreProperty]
        public string Name { get; set; }
        [FirestoreProperty]
        public double Price { get; set; }
        [FirestoreProperty]
        public string Description { get; set; }
        [FirestoreProperty]
        public string Category { get; set; }
        [FirestoreProperty]
        public int Stock { get; set; }
        [FirestoreProperty]
        public string ImageUrl { get; set; }
    }
}
