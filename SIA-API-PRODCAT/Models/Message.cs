using Google.Cloud.Firestore;

namespace SIA_API_PRODCAT.Models
{
    [FirestoreData]
    public class Message
    {
        [FirestoreProperty]
        public string text { get; set; }
    }
}
