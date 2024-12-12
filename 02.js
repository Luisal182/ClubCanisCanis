

document.addEventListener('DOMContentLoaded', function () {
    const heroSection = document.querySelector('.hero');
    
    // Verify if heroSection exists
    if (!heroSection) {
        console.error("No .hero section found in the DOM");
        return;
    }
    
    // Fetching random image
    async function fetchBackgroundImage() {
        try {
            console.log("Fetching random dog image...");
            const response = await fetch('https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            // Parse the JSON response
            const data = await response.json();
            console.log("Fetched data:", data);
            const imageUrl = data[0]?.url;
            
            // Check if we got a valid image URL
            if (!imageUrl) {
                throw new Error('Image URL is missing in the API response');
            }
        
            heroSection.style.backgroundImage = `url(${imageUrl})`;
            heroSection.style.backgroundSize = 'cover';
            heroSection.style.backgroundPosition = 'center';
            heroSection.style.backgroundRepeat = 'no-repeat';

            // Hide the loading text after the image is fetched
            const loadingIndicator = heroSection.querySelector('.loading');
            if (loadingIndicator) {
                loadingIndicator.style.display = 'none'; // Hide the loading indicator
            }
            
        } catch (error) {
            console.error('Error fetching image:', error);
            
            // Handle error gracefully and show a message to the user
            const loadingIndicator = heroSection.querySelector('.loading');
            if (loadingIndicator) {
                loadingIndicator.textContent = 'Failed to load image'; 
            }
        }
    }

    fetchBackgroundImage();
});

//----------------------------- First Button---------------------------
const fetchButtonAffenpinscher = document.getElementById('fetchButtonAffenpinscher');
const dogImage = document.getElementById('dogImage');
const dogInfo = document.getElementById('dogInfo');


fetchButtonAffenpinscher.addEventListener('click', function() {
    const url = 'https://dog.ceo/api/breed/affenpinscher/images/random';

    // Fetch dog image
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            // Display the image
            dogImage.src = data.message;
            dogImage.style.display = 'block';

            // Display some breed information
            dogInfo.innerHTML = `
                <h4>Affenpinscher Breed Info</h4>
     <p>Affenpinschers are small, monkey-faced toy dogs originally from Germany, bred to catch rats in homes and barns. 
     Despite their size (7-10 pounds), they have a bold, confident personality and are often fearless in the face of larger dogs. 
     Known for their distinctive wiry coat and mane-like ruff around the neck, they are affectionate with their families but can be independent and stubborn,
      making training a challenge. Affenpinschers are alert, intelligent, and protective, excelling as watchdogs. 
      They have moderate exercise needs and live 12-14 years on average, though they may be prone to knee problems 
      and breathing issues due to their short muzzle. Regular grooming and early socialization are key to keeping them healthy and happy. 
      Despite their small size, their big personality makes them beloved companions.</p>
       <p>These little dogs pack a lot of character into their small frames, and their unique appearance often draws attention. 
       Their rough, tousled coat can be a lot of work to maintain, requiring regular brushing to prevent mats and tangles. 
       Many owners also enjoy having their Affenpinscher professionally groomed to highlight their signature "ruff."
        While they are not the easiest breed to train, their loyalty and strong bond with their owners make them eager to please once they feel connected. 
        Early socialization with other dogs and people is essential to curb their sometimes aloof or stubborn tendencies.</p> 
        <p>Affenpinschers are often described as having a terrier-like temperament, as they can be feisty and energetic.
         However, they also enjoy curling up on laps and are known for being affectionate and attentive to their owners.
          This breed tends to be quite vocal and may alert you to any perceived threat with barking, making them excellent watchdogs despite their size. 
          They are also very curious, often exploring their surroundings with enthusiasm and sometimes getting into mischief.</p>
           <p>Because of their small size and sturdy build, Affenpinschers are well-suited for apartment living, though they still require daily mental 
           and physical stimulation. While they don’t need long walks, they do enjoy playtime and interactive games. 
           As with any toy breed, keeping their environment safe from potential hazards is important, as they can be fragile in some situations.
            If you're looking for a dog that's spirited, fun, and full of personality, the Affenpinscher is sure to be a delightful companion.</p>
            `;
        })
        .catch((error) => {
            dogInfo.innerHTML = `Error fetching dog image: ${error.message}`;
            dogImage.style.display = 'none';
        });
});

// -----------------------Second Button: Fetch a random dog breed image and display breed info-------------------
const fetchButtonRandomBreed = document.getElementById('fetchButtonRandomBreed');
const imageContainer = document.getElementById('imageContainer');
const breedInfo = document.getElementById('breedInfo');

const breedInfoDatabase = {
  "affenpinscher": "A small terrier-like toy dog originating from Germany. Known for their monkey-like facial expression, they are playful, adventurous, and make excellent companion dogs.",
  "beagle": "Beagles are medium-sized hound dogs known for their merry and friendly personality. They are highly intelligent, curious, and excellent at scent detection.",
  "bulldog": "Bulldogs are muscular, stocky dogs with a gentle disposition. Known for their wrinkled faces and calm nature, they are great companions for families and individuals alike.",
  "poodle": "Poodles are intelligent, highly trainable dogs with a hypoallergenic coat. They come in three sizes: standard, miniature, and toy, and are known for their elegance and playfulness.",
  "labrador": "Labradors are one of the most popular dog breeds. They are friendly, outgoing, and highly trainable, often used as service dogs or for hunting.",
  // Add more breeds and their descriptions here...
};

fetchButtonRandomBreed.addEventListener('click', function() {
    fetch('https://dog.ceo/api/breeds/list/all')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            const breeds = Object.keys(data.message);
            // Select a random breed
            const randomBreed = breeds[Math.floor(Math.random() * breeds.length)];
            return Promise.all([
                fetch(`https://dog.ceo/api/breed/${randomBreed}/images/random/6`),
                randomBreed
            ]);
        })
        .then(([imagesResponse, breed]) => {
            if (!imagesResponse.ok) {
                throw new Error('Network response was not ok');
            }
            return Promise.all([imagesResponse.json(), breed]);
        })
        .then(([data, breed]) => {
            // Clear previous content
            imageContainer.innerHTML = '';
            breedInfo.innerHTML = '';

            // Capitalize breed name
            const capitalizedBreed = breed
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

            // Display breed information
            const breedDescription = breedInfoDatabase[breed] || 
                "A unique and fascinating companion, embodying an extraordinary blend of instinct, emotion, and intelligence that transcends simple animal existence. Dogs represent a remarkable species capable of forming deep emotional bonds, communicating complex feelings, and adapting to diverse environments while maintaining an unwavering loyalty that connects them intimately with humans through a language that goes beyond words. Their capacity to sense and respond to human emotions, as well as their remarkable ability to learn and perform tasks, makes them invaluable not only as pets but also as working animals in roles such as therapy, search-and-rescue, and assistance for people with disabilities. Whether as protectors, playmates, or trusted companions, dogs have a unique ability to enrich our lives with their love, devotion, and presence. Their versatility allows them to thrive in various environments, offering comfort, companionship, and security while intuitively responding to their owners' needs and emotions.";

                breedInfo.innerHTML = `
                <div id="breedTitle">
                    <h5>${capitalizedBreed} Breed Information</h5>
                </div>
                <p>${breedDescription}</p>
            `;

            // Display multiple images
            data.message.forEach((imageUrl) => {
                const img = document.createElement('img');
                img.src = imageUrl;
                img.classList.add('dog-image');
                img.alt = `${capitalizedBreed} Dog`;
                imageContainer.appendChild(img);
            });
        })
        .catch((error) => {
            // Handle any errors
            breedInfo.innerHTML = `Error fetching dog information: ${error.message}`;
        });
});





///////-----------------------------------Take out fotos Button 1-------------------------------///////
const cleanFotos = document.getElementById("cleanFotos");
const dogyImage =  document.getElementById("dogImage");

cleanFotos.addEventListener("click", function(e) {
  // Remove the dog image completely from the DOM
  dogImage. src=""
});

/////////--------------------------------take out fotos button random-------------------////////////
const cleanRandom =  document.getElementById("cleanRandom");
const randomImage =  document.getElementById("imageContainer");
const breedRandomInfo = document.getElementById('breedInfo');////////////

cleanRandom.addEventListener("click", function(e) {
    // Remove the dog image completely from the DOM
    randomImage.remove();
    breedRandomInfo.remove();////////////////////////QUITAR INFO

  });


  
