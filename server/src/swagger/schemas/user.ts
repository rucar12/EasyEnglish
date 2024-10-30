/**
 * @swagger
 * components:
 *   schemas:
 *     UserRegistration:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - firstName
 *         - lastName
 *       properties:
 *         email:
 *           type: string
 *           description: User email
 *         password:
 *           type: string
 *           description: User password
 *         firstName:
 *           type: string
 *           description: User firstname
 *         lastName:
 *           type: string
 *           description: User lastname
 *       example:
 *         email: "user@example.com"
 *         password: "securepassword"
 *         firstName: "Happy"
 *         lastName: "Meals"
 *     UserInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - firstName
 *         - lastName
 *       properties:
 *         email:
 *           type: string
 *           description: User email
 *         password:
 *           type: string
 *           description: User password
 *         firstName:
 *           type: string
 *           description: User firstname
 *         lastName:
 *           type: string
 *           description: User lastname
 *       example:
 *         email: "user@example.com"
 *         password: "securepassword"
 *         firstName: "Happy"
 *         lastName: "Meals"
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: number
 *           description: User id
 *         email:
 *           type: string
 *           description: User email
 *         firstName:
 *           type: string
 *           description: User firstname
 *         lastName:
 *           type: string
 *           description: User lastname
 *       example:
 *         id: 234
 *         email: "user@example.com"
 *         firstName: "Happy"
 *         lastName: "Meals"
 */
