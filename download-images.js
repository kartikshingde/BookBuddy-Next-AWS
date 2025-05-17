const https = require('https');
const fs = require('fs');
const path = require('path');

const books = [
  {
    title: 'white-tiger',
    url: 'https://m.media-amazon.com/images/I/71+xgD5TIJL._AC_UF1000,1000_QL80_.jpg'
  },
  {
    title: '2-states',
    url: 'https://m.media-amazon.com/images/I/817tHNcyAgL._AC_UF1000,1000_QL80_.jpg'
  },
  {
    title: 'the-guide',
    url: 'https://m.media-amazon.com/images/I/81jv44QdNwL._AC_UF1000,1000_QL80_.jpg'
  },
  {
    title: 'train-to-pakistan',
    url: 'https://m.media-amazon.com/images/I/81nU9Q8o6JL._AC_UF1000,1000_QL80_.jpg'
  },
  {
    title: 'immortals-of-meluha',
    url: 'https://m.media-amazon.com/images/I/91lzqGrWJ9L._AC_UF1000,1000_QL80_.jpg'
  },
  {
    title: 'five-point-someone',
    url: 'https://m.media-amazon.com/images/I/81QKKkL6MTL._AC_UF1000,1000_QL80_.jpg'
  },
  {
    title: 'god-of-small-things',
    url: 'https://m.media-amazon.com/images/I/71m+kC4vOxL._AC_UF1000,1000_QL80_.jpg'
  },
  {
    title: 'midnights-children',
    url: 'https://m.media-amazon.com/images/I/71mNQY+B8YL._AC_UF1000,1000_QL80_.jpg'
  },
  {
    title: 'palace-of-illusions',
    url: 'https://m.media-amazon.com/images/I/81dQwQlmAXL._AC_UF1000,1000_QL80_.jpg'
  },
  {
    title: 'wings-of-fire',
    url: 'https://m.media-amazon.com/images/I/71KKZlVjbwL._AC_UF1000,1000_QL80_.jpg'
  },
  {
    title: 'room-on-the-roof',
    url: 'https://m.media-amazon.com/images/I/71gzHUM+9yL._AC_UF1000,1000_QL80_.jpg'
  },
  {
    title: 'sacred-games',
    url: 'https://m.media-amazon.com/images/I/81RrJR+3PbL._AC_UF1000,1000_QL80_.jpg'
  }
];

const downloadImage = (url, filename) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filename);
        response.pipe(fileStream);
        
        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`Downloaded: ${filename}`);
          resolve();
        });
      } else {
        reject(`Failed to download ${filename}`);
      }
    }).on('error', (err) => {
      reject(err);
    });
  });
};

async function downloadAllImages() {
  const dir = path.join(process.cwd(), 'public', 'books');
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  for (const book of books) {
    const filename = path.join(dir, `${book.title}.jpg`);
    try {
      await downloadImage(book.url, filename);
    } catch (error) {
      console.error(`Error downloading ${book.title}:`, error);
    }
  }
}

downloadAllImages().then(() => {
  console.log('All downloads completed!');
}).catch(console.error); 