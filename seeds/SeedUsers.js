var User = require('../app/models/ModelUser');

var maleFirstNames = "Jacob Michael Joshua Matthew Daniel Christopher Andrew Ethan Joseph William Anthony David Alexander Nicholas Ryan Tyler James John Jonathan Noah Brandon Christian Dylan Samuel Benjamin Nathan Zachary Logan Justin Gabriel Jose Austin Kevin Elijah Caleb Robert Thomas Jordan Cameron Jack Hunter Jackson Angel Isaiah Evan Isaac Mason Luke Jason Gavin Jayden Aaron Connor Aiden Aidan Kyle Juan Charles Luis Adam Lucas Brian Eric Adrian Nathaniel Sean Alex Carlos Ian Bryan Owen Landon Julian Chase Cole Diego Jeremiah Steven Sebastian Xavier Timothy Carter Wyatt Brayden Blake Hayden Devin Cody Richard Seth Dominic Jaden Antonio Miguel Liam Patrick Carson Jesse Tristan Alejandro Henry Victor Trevor Bryce Jake Riley Colin Jared Jeremy Mark Caden Garrett Parker Marcus Vincent Kaleb Kaden Brady Colton Kenneth Joel Oscar Josiah Jorge Cooper Ashton Tanner Eduardo Paul Edward Ivan Preston Maxwell Alan Levi Stephen Grant Nicolas Omar Dakota Alexis George Collin Eli Spencer Gage Max Cristian Ricardo Derek Micah Brody Francisco Nolan Ayden Dalton Shane Peter Damian Jeffrey Brendan Travis Fernando Peyton Conner Andres Javier Giovanni Shawn Braden Jonah Bradley Cesar Emmanuel Manuel Edgar Erik Mario Edwin Johnathan Devon Erick Wesley Oliver Trenton Hector Malachi Jalen Raymond Gregory Abraham Elias Leonardo Sergio Donovan Colby Marco Bryson Martin".split(' ');
var femaleFirstNames = "Mary Patricia Linda Barbara Elizabeth Jennifer Susan Margaret Dorothy Liza Nancy Karen Betty Helen Sandra Donna Carol Ruth Sharon Michelle Laura Sarah Kimberly Deborah Jessica Shirley Cynthia Angela Melissa Brenda Amy Anna Rebecca Virginia Kathleen Pamela Martha Debra Amanda Stephanie Carolyn Christine Marie Janet Catherine Frances Ann Joyce Diane Alice Julie Heather Teresa Doris Gloria Evelyn Jean Cheryl Katherine Joan Ashley Judith Rose Janice Kelly Nicole Judy Christina Kathy Theresa Beverly Denise Tammy Irene Jane Lori Rachel Marilyn Andrea Kathryn Louise Sara Anne Jacqueline Wanda Bonnie Julia Ruby Lois Tina Phyllis Norma Paula Diana Annie Lillian Emily Robin Peggy Crystal Gladys Rita Dawn Connie Florence Tracy Edna Tiffany Carmen Rosa Cindy Grace Wendy Victoria Edith Kim Sherry Sylvia Josephine Thelma Shannon Ethel Ellen Elaine Marjorie Carrie Charlotte Monica Esther Pauline Emma Juanita Anita Rhonda Hazel Amber Eva Debbie April Leslie Clara Lucille Jamie Joanne Eleanore Valerie Danielle Megan Alicia Suzanne Michele Gail Bertha Darlene Veronica Jill Erin Lauren Cathy Joann Lorraine Lynn Sally Regina Erica Beatrice Dolores Bernice Audrey Yvonne Annette June Samantha Marion Dana Stacy Ana Renee Ida Vivian Roberta Holly Brittany Melanie Loretta Yolanda Jeanette Laurie Katie Kristen Vanessa Alma Sue Elsie Beth".split(' ');
var lastNames = "Smith Johnson Williams Jones Brown Davis Miller Wilson Moore Taylor Anderson Thomas Jackson White Harris Martin Thompson Garcia Martinez Robinson Clark Rodriguez Lewis Lee Walker Hall Allen Young Hernandez King Wright Lopez Hill Scott Green Adams Baker Gonzalez Nelson Carter Mitchell Perez Roberts Turner Phillips Campbell Parker Evans Edwards Collins Stewart Sanchez Morris Rogers Reed Cook Morgan Bell Murphy Bailey Rivera Cooper Richardson Cox Howard Ward Torres Peterson Gray Ramirez James Watson Brooks Kelly Sanders Price Bennett Wood Barnes Ross Henderson Coleman Jenkins Perry Powell Long Patterson Hughes Flores Washington Butler Simmons Foster Gonzales Bryant Alexander Russell Griffin Diaz Hayes Myers Ford Hamilton Graham Sullivan Wallace Woods Cole West Jordan Owens Reynolds Fisher Ellis Harrison Gibson Mcdonald Cruz Marshall Ortiz Gomez Murray Freeman Wells Webb Simpson Stevens Tucker Porter Hunter Hicks Crawford Henry Boyd Mason Morales Kennedy Warren Dixon Ramos Reyes Burns Gordon Shaw Holmes Rice Robertson Hunt Black Daniels Palmer Mills Nichols Grant Knight Ferguson Rose Stone Hawkins Dunn Perkins Hudson Spencer Gardner Stephens Payne Pierce Berry Matthews Arnold Wagner Willis Ray Watkins Olson Carroll Duncan Snyder Hart Cunningham Bradley Lane Andrews Ruiz Harper Fox Riley Armstrong Carpenter Weaver Greene Lawrence Elliott Chavez Sims Austin Peters Kelley Franklin Lawson Fields Gutierrez Ryan Schmidt Carr Vasquez Castillo Wheeler Chapman Oliver Montgomery Richards Williamson Johnston Banks Meyer Bishop Mccoy Howell Alvarez Morrison Hansen Fernandez Garza Harvey Little Burton Stanley Nguyen George Jacobs Reid Kim Fuller Lynch Dean Gilbert Garrett Romero Welch Larson Frazier Burke Hanson Day Mendoza Moreno Bowman Medina Fowler Brewer Hoffman Carlson Silva Pearson Holland Douglas Fleming Jensen Vargas Byrd Davidson Hopkins May Terry Herrera Wade Soto Walters Curtis Neal Caldwell Lowe Jennings Barnett Graves Jimenez Horton Shelton Barrett Obrien Castro Sutton Gregory Mckinney Lucas Miles Craig Rodriquez Chambers Holt Lambert Fletcher Watts Bates Hale Rhodes Pena Beck Newman Haynes Mcdaniel Mendez Bush Vaughn Parks Dawson Santiago Norris Hardy Love Steele Curry Powers Schultz Barker Guzman Page Munoz Ball Keller Chandler Weber Leonard Walsh Lyons Ramsey Wolfe Schneider Mullins Benson Sharp Bowen Daniel Barber Cummings Hines Baldwin Griffith Valdez Hubbard Salazar Reeves Warner Stevenson Burgess Santos Tate Cross Garner Mann Mack Moss Thornton Dennis Mcgee Farmer Delgado Aguilar Vega Glover Manning Cohen Harmon Rodgers Robbins Newton Todd Blair Higgins Ingram Reese Cannon Strickland Townsend Potter Goodwin Walton Rowe Hampton Ortega Patton Swanson Joseph Francis Goodman Maldonado Yates Becker Erickson Hodges Rios Conner Adkins Webster Norman Malone Hammond Flowers Cobb Moody Quinn Blake Maxwell Pope Floyd Osborne Paul Mccarthy Guerrero Lindsey Estrada Sandoval Gibbs Tyler Gross Fitzgerald Stokes Doyle Sherman Saunders Wise Colon Gill Alvarado Greer Padilla Simon Waters Nunez Ballard Schwartz Mcbride Houston Christensen Klein Pratt Briggs Parsons Mclaughlin Zimmerman French Buchanan Moran Copeland Roy Pittman Brady Mccormick Holloway Brock Poole Frank Logan Owen Bass Marsh Drake Wong Jefferson Park Morton Abbott Sparks Norton Huff Clayton Massey Lloyd Figueroa Carson Bowers Roberson Barton Tran Lamb Harrington Casey Boone Cortez Clarke Mathis Singleton Wilkins Cain Bryan Underwood Hogan Mckenzie Collier Luna Phelps Mcguire Allison Bridges Wilkerson Nash Summers Atkins".split(' ');
var positions = ['Project Leader', 'FrontEnd Developer', 'Backend Developer', 'JavaScript FullStack Developer', 'Ruby Developer', 'PHP Developer', ' Python Developer', 'Mobile Developer', 'Android Developer', 'iOS Developer', 'Graphic Designer', 'UI Designer', 'UX Designer', 'FullStack Developer', 'DevOps', 'SysAdmin'];

function generateUsers (quantity) {
  for (var i = 0; i < quantity; i++) {
    var sex = Math.floor((Math.random() * 2)) + 1;
    var lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    var firstName = '';

    if (sex === 1) {
      firstName = maleFirstNames[Math.floor(Math.random() * maleFirstNames.length)];
    } else {
      firstName = femaleFirstNames[Math.floor(Math.random() * femaleFirstNames.length)];
    }

    var userName = '';
    var position = '';

    if (i === 0) {
      userName = 'admin';
      position = 'Project Leader';
    } else {
      userName = firstName[0].toLowerCase() + lastName.toLowerCase();
      position = positions[Math.floor(Math.random() * positions.length)];
    }

    var instance = new User({
      userName : userName,
      pass     : '1234',
      firstName: firstName,
      lastName : lastName,
      email    : userName + '@company.com',
      position : position
    });

    instance.save(function (err, res) {
      if (err) {
        console.error(err);
      }
    });
  }

  console.log('Users generated');
};

module.exports = generateUsers;
