const loadLevel = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((response) => response.json())
    .then((json) => displayLesson(json.data));
};


const removeActive = ()=>{

  const lessonBtn = document.querySelectorAll('.lesson-btn');
 lessonBtn.forEach((btn)=> btn.classList.remove("active"));
}



const wordPress = (id) => {
  const ul = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(ul)
    .then((res) => res.json())
    .then((content) =>{
      
      removeActive();
const clickBtn = document.getElementById(`lesson-btn-${id}`);
clickBtn.classList.add("active");

// console.log(clickBtn);
     
    displayWordPress(content.data);
    });
};

const wordDetail =async(id) =>{

  const url = `https://openapi.programming-hero.com/api/word/${id}`;

  const res = await fetch(url);
  const details = await res.json();
displayWordDetail(details.data)
 
}

const displayWordDetail = (word) =>{
const wordDD = document.getElementById('wordDD');
wordDD.innerHTML = `



<div class="text-3xl font-bold">
          <h2>
            ${word.word} (<i class="fa-solid fa-microphone-lines"></i>: ${word.pronunciation})
         </h2>
    </div>
     <div>
          <h2 class = "text-lg font-bold">
            Meaning
         </h2>
         <p class="font-medium">
          ${word.meaning}
         </p>
    </div>
     <div>
          <h2 class = "text-lg font-bold">
            Example
         </h2>
         <p class="font-medium">
          ${word.sentence}        
         </p>
    </div>
     <div>
          <h2 class = "text-lg font-bold">
            সমার্থক শব্দ গুলো
         </h2>
         <p class = "btn font-medium">${word.synonyms[0]}</p>
         <p class = "btn font-medium">${word.synonyms[1]}</p>
         <p class = "btn font-medium">${word.synonyms[2]}</p>
    </div>

`

document.getElementById('wordModal').showModal();
}

const displayWordPress = (words) => {
  const vocabConst = document.getElementById("vocab-words");
  vocabConst.innerHTML = "";

  if (words.length == 0) {
    vocabConst.innerHTML = `
     <div class="font-bangla col-span-full mx-auto space-y-5 text-center">
       <img class = "mx-auto w-4/12 lg:w-3/12" src="./assets/alert-error.png">
        <h2 class=" text-xl md:text-2xl text-red-700 font-bold">এই Lesson-এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h2>
        <p class="text-base md:text-xl font-semibold text-gray-400">Please move forward Or go back to another Lesson</p>
      </div> 
    `;

    return;
  }

  for (let word of words) {
    console.log(word);
    const wordSection = document.createElement("div");
    wordSection.innerHTML = `
 
  
     <div class="bg-white text-center py-7 rounded-sm space-y-5 ">

        <h2 class="text-xl md:text-2xl font-bold">${word.word ? word.word : "Word পাওয়া যায়নি"}</h2>
        <p class="font-medium">
          Meaning /Pronounciation
        </p>
        <div class="text-xl font-bold text-gray-600 font-bangla" >"${word.meaning ? word.meaning : "Meaning পাওয়া যায়নি"  } / ${word.pronunciation ? word.pronunciation : "Pronunciation পাওয়া যায়নি"  }"</div>

              <!-- icons -->
              
      <div class="flex justify-between mx-10 items-center pt-5 ">

<button onclick="wordDetail(${word.id})">
<i class="fa-solid fa-circle-info bg-[#1A91FF20] p-2 hover:bg-[#1A91FF70] rounded text-gray-700"></i> </button>

<button>
<i class="fa-solid fa-volume-high bg-[#1A91FF20] p-2 hover:bg-[#1A91FF70] rounded text-gray-700"></i>
</button>

      </div>
      </div>


  `;
    vocabConst.append(wordSection);
  }
};

const displayLesson = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  for (let lesson of lessons) {
    const levelDiv = document.createElement("div");
    levelDiv.innerHTML = `
                  <button id ="lesson-btn-${lesson.level_no}" onclick="wordPress(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"
                  ><i class="fa-solid fa-book-open"></i> Lesson ${lesson.level_no}
                  </button>
`;
    levelContainer.append(levelDiv);
  }
};
loadLevel();
