/**
 * @swagger
 * components:
 *   schemas:
 *     VideoCreating:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - userId
 *         - url
 *       properties:
 *         title:
 *           type: string
 *           description: Video title
 *         description:
 *           type: string
 *           description: Video description
 *         userId:
 *           type: number
 *           description: User id
 *         url:
 *           type: string
 *           description: Video url
 *       example:
 *         title: "Movie"
 *         description: "Some movie description"
 *         url: "https://www.movie.com"
 *         userId: 123
 *     VideoUpdating:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Video title
 *         description:
 *           type: string
 *           description: Video description
 *         url:
 *           type: string
 *           description: Video url
 *       example:
 *         title: "Movie"
 *         description: "Some movie description"
 *         url: "https://www.movie.com"
 *     Video:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Video title
 *         description:
 *           type: string
 *           description: Video description
 *         url:
 *           type: string
 *           description: Video url
 *         userId:
 *           type: number
 *           description: User id
 *       example:
 *         title: "Movie"
 *         description: "Some movie description"
 *         url: "https://www.movie.com"
 *         userId: 123
 */
