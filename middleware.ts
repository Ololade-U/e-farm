import middleware from 'next-auth/middleware'

export default middleware;

export const config = {
    matcher : ['/home', '/home/farmer', '/home/consumer']
}