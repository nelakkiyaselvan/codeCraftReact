This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Title
Code Craft Responsive UI

## Description:
This is a prototypical implementation of responsive product detail page with product list.

## Table of Contents

- [Setting of the Project](#Setting-of-the-Project)


## Setting of the Project

To Run the project follow below commands:
* Pull the repro from `https://github.com/nelakkiyaselvan/codeCraftReact.git`
* Run the `npm install` in the code-craft folder
* After the successfull installation run the `npm start` in the code-craft folder

## Tech Stack
* React JS
* HTML
* CSS

## Test Cases

1. Page loaded as per design. - Pass
2. UI fits perfectly for desktop, tablet and mobile views. - Pass
3. Render the product list from the JSON Object if the product image, name and id available. - Pass
4. Clicking on the procut highlighted with the arrow icon. - Pass
5. Clicking on the product will open the prodcut detail tab with appropriate product details and back button. - Pass
6. Clicking the toggle button reveals the product details. - Pass
7. The product skus rendered based on the product. - Pass
8. Selecting the sku will enable the feature section. - Pass
9. Deselecting the sku will reset the feature section. - Pass
10. Changing the sku also resets the feature section. - Pass
11. Selecting the mode highlighted with background color and the image/text colors are changed. - Pass
12. Selecting the mode will demonstrate the brightness of the product in intensity section. - Pass
13. Selecting the mode will show the appropriate volume in the intensity section.
14. by clicking the back button remove the product detail tab and bring the user to the inital level. - Pass
15. In mobile & tablet view Portrait and Landscape orientation change handled. - Pass

Notes:
1. All data rendered dynamically and reuse the template for any product list.
2. The intensity / mode section rendered as static. We can added the details in product json and render dynamically.
3. I didn't used any third-party plugins here.
    - We can achive the round slider using third-party react modules.