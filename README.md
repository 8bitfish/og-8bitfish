# The origin of 8bitfish

[Hackathon devpost](https://devpost.com/software/8-bitfish)

![og](https://user-images.githubusercontent.com/72945168/139733277-c1db5950-6938-4629-83a8-673ed2786244.jpeg)

## Inspiration

We learned about CryptoCollectables like CryptoKitties and were immediately intrigued. Crypto Collectibles are a unique digital asset that anybody can mint. These assets can then be sold on public markets for Ethereum. CryptoCollectables offer standardization, high liquidity, and programmability to give you infinite possibilities and make it that much better than collecting stamps or trading cards. Since they are stored on the decentralized Ethereum blockchain, they are inherently very secure and easy to trade/transfer. People like Mark Cuban believe that NFTs and CryptoCollectables are the future of assets.

## What it does

Our program lets a user mint a completely unique 8bitfish NFT and trade it anywhere on the Ethereum blockchain. One restraint is that hosting a site with smart contracts connected to the Ethereum blockchain is very expensive. We deployed the website so you can experience the amazingness but just without the NFT generation’s functionality. Locally, the smart contracts have full functionality. We also have a corresponding app that lets you view your fishies in an AR experience and give your expensive token a fun purpose!

## How we built it

We created a website where users can pay Ether and mint their unique 8bitfish in React and Solidity. We used Netlify’s edge network to deploy a serverless API to seamlessly connect the Website and App’s wallet. The app is built through XCode in Swift and made with Unity. Unity 3d was used to replicate the 3 dimensional world, and it was then combined with Unity’s ARFoundation Package and Apple’s ARKit to bring 8bitfish to Augmented Reality!

## Challenges we ran into

On the first day, we found out we needed to use Solidity to generate ERC-721 NFTs. We had never heard of Solidity prior to the competition and had to learn an entirely new language in the span of 2 days. After late nights and early mornings of researching and experimenting, we finally created our own NFT generation. This caused a domino effect on our project though because we used up so much of our precious time. We had limited time to create the Website and App but luckily, we could use languages we already knew. This still constrained us and I feel that the website and app could be better if we had more time. Another challenge we faced was connecting the app and the website. It would take too much time to write an individual backend for both the app and website when they both needed similar functionality. This is when we decided the best option would be to write a custom API that could interface with both the app and website to authenticate users, allow users to add fish to their accounts, and view the fish that they had minted on the website.

## Accomplishments that we're proud of

We are extremely proud of our NFT generation and art. We created every single fish and asset ourselves which took way longer than it needed to. Then we spent hours bug fixing and creating NFT generations. In the end, it was worth it because we finally finished, we sat in a discord call and generated fish for 15 minutes straight, and freaked out when we got a rare one. We are so happy with how it turned out and it feels amazing to see all of our pixel art and Solidity pay off. Building an equally beautiful website to match the beautiful programming was a daunting task but also turned out amazing. After attending the Illumination Animation Minion workshop, we were inspired and immediately went to work on animating our website. I love how the animation brings life to the home page of our site! We went into this having no idea how to deploy an API to Netlify. We had a little bit of knowledge about how Netlify’s functions worked, and very little time to create a backend. By isolating the majority of the backend functionality for both platforms (Web and Mobile) to our Netlify functions, we were able to save time and standardize the backend across both platforms. We used Netlify functions to push images to Cloudinary, authenticating users with Firebase auth, and storing user’s fishes in Firebase store. This allowed both the app and the website to just interface with the api in order to complete most of the backend tasks such as authenticating users, getting their fish, and adding fish that they have minted on our platform.

## What we learned

We learned how to create Ethereum apps with Solidity, use Netlify’s serverless functions to create an edge based API, create a user login/signup with Firebase Auth, use Firebase Store to store user information, use Cloudinary to host images for usage on any platform, create mobile AR experiences with Unity and Blender

