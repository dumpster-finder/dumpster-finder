import _ from "lodash";

export default function() {
    return {
        find: async (pictureID: string) =>
            await new Promise(resolve => {
                setTimeout(resolve, 3000);
            }),
        upload: async (file: any) =>
            await new Promise(resolve => {
                setTimeout(resolve, 3000);
            }),
    };
}
