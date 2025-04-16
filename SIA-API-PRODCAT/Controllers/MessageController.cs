﻿using Microsoft.AspNetCore.Mvc;
using Google.Apis.Auth.OAuth2;
using Google.Cloud.Firestore;
using System.Text;
using FirebaseAdmin;
using SIA_API_PRODCAT.Models;

namespace SIA_API_PRODCAT.Controllers
{
    [ApiController]
    [Route("test")]
    public class MessageController : Controller
    {
        private readonly FirestoreDb _firestoredb;
        public MessageController()
        {
            string firebaseKey = @"{
                  ""type"": ""service_account"",
                  ""project_id"": ""sia-prodcat"",
                  ""private_key_id"": ""8c2c7ad824d054646154bfd1496aed87e3aa333f"",
                  ""private_key"": ""-----BEGIN PRIVATE KEY-----\nMIIEuwIBADANBgkqhkiG9w0BAQEFAASCBKUwggShAgEAAoIBAQC6oSiqwL7imut2\nv0i2WSdJtHiaptBZdO//aUltjH/bHirTrfY3YUATTc5jY7Bo3Hj+ypeAWE198SPW\nIkYco57ZjP/UT78Rdbg3tTt7iDC/zRj8uPln/3IQmFTCytMkXOc9sSlWp94EpCFd\n466ZMQ3wpksgS7LwVrl9ZcbJpiaybgADMkjuxiVrMR5Zvs+6OykU41uw2/8YGvO6\nNi17YhPg7cDvs6INR2ZicqbIJ0/o8E4L3GacP9x/8AwTUqFsI2kA2WPuXkZ99z2M\nvYvWEXTgEW1a9maQHOeoEKZIvw42O4PNUbkVY7f0bgw23NfVKTXMBrr51/oRmp3y\npQ0bBK3tAgMBAAECgf8b9ndYQtIN2Lq4Il6wYWImKPZ7WhVv5CfIU+vja85Oqv+b\nJYfQ6Pgwx66ANcsB6ytab24fKEB0HlHk1fSrVdiuCRbeFDlVv82jZpZwtQl0Rcav\nhL5sDX6uRwAjCveX1pzPIYVriLtf0hMtx0rhza6kckYYfmOsnwi+HJQHxzi78Mb8\n5HijDgMY2jWRqnsJR5AKyfPEuFBLzKJC7V1qxpHGYS9S52r6o9qN8cz31iYg0aI/\nXYPSZrnTmmAWw53vNu+oXQkZTd88HDkNvPHyILr24aMYZJk9TMQeu7a4PuSjgzsu\nh4q2WUUSR/t0E/048zO3vPvp67mXANEoTItzvVECgYEA2/Ho1qaAs+91Rfz069a0\n8B3gginDfkpgE5AaLflhUfqU/vqMvWcfVrOPYpwf5AEH7JdUfjtU2CdrDsvnVaKk\nlFJ+np+mIeSSGLWYRY1UpqsSz76WlXvj1HnCRiSHn4FTGh82uTo+pEDHYG8bZ5ng\nWtQT7y4XksEIsotOFCfFiBUCgYEA2Tkm6yxysNPg5FQWT7Vz7HL/EtQhA1GBLuUN\nzn26Stu42OmYK4ID/i0irxBqwIVw4bojeXuycebFbe8/fmy0nFOvSpCfjEO0Fevn\nyRvqWUVpM3UVG4R0JsjEwi75qK9W7WNtaQdBzLn8H3z7+1XpD7f9XhbBYnnzyt45\nBRlk7HkCgYEAwAaqpI1mHLLaDqrVIvqnqmRLWRkhZyeETlAnqy/pOeuvHhadvddE\n0yud6hgo96W2x2cwC629W6K+o4J+jJOdYSnNBqyYHUs0CoKxWTgVShZeLCZXzlcG\nCMHtTdQi3K3KYioSWxFxE3LDH3yhzofYCzTR2qbBSg1ijI93Mb2vhikCgYB72nlV\nR7+REQ2+Qi+CfSw+mgbTvn2gPb2Rdmpb3RX2DrejffUUgYozR5rqBEtJwAvvuEj3\nwE6rYPAa0Xn7ZJHKPHDK7BD8UbIBecNryG3jPo9QFqbVTL1JS9nb+hrBUlAXBETi\nyI984mJdtc6arI45NyfQmNrkgjI97lzGiocfyQKBgDGCbku99SC+zRkvtExUj+MT\nKpYhXttq/06BFWOhouYobDy5GTDxBT47/Q+aD6/JdKqfqvZwlTB4FQ4ZEnSixEUv\nL0llUtd0EDcmavW8pXhNRqUFIRt9GV22w+7H7JtB4F4a4NCzz3p4eZ0c3rWkdBST\n65zOkKGy3CoyhGqzt5s2\n-----END PRIVATE KEY-----\n"",
                  ""client_email"": ""firebase-adminsdk-fbsvc@sia-prodcat.iam.gserviceaccount.com"",
                  ""client_id"": ""104105419746230076613"",
                  ""auth_uri"": ""https://accounts.google.com/o/oauth2/auth"",
                  ""token_uri"": ""https://oauth2.googleapis.com/token"",
                  ""auth_provider_x509_cert_url"": ""https://www.googleapis.com/oauth2/v1/certs"",
                  ""client_x509_cert_url"": ""https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40sia-prodcat.iam.gserviceaccount.com"",
                  ""universe_domain"": ""googleapis.com""
             }";

            var stream = new MemoryStream(Encoding.UTF8.GetBytes(firebaseKey));

            var credential = GoogleCredential.FromStream(stream);
            if(FirebaseApp.DefaultInstance == null)
            {
                FirebaseApp.Create(new AppOptions
                {
                    Credential = credential,
                });
            }

            _firestoredb = FirestoreDb.Create("sia-prodcat");
        }

        [HttpPost("/api/test")]

        public async Task<IActionResult> AddSimple([FromBody] Message data)
        {
            var docRef = _firestoredb.Collection("test").Document();
            await docRef.SetAsync(data);
            return Ok("Message added");
        }
    }
}
