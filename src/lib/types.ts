export type TextData = {
    id: number,
    title: string,
    content: string
}

export type ProjectData = {
    id: string;
    name: string;
    description: string;
    published: boolean;
    slug: string;
    createdAt: Date;
    categories: {
        id: number;
        name: string;
    }[];
    images: {
        id: string;
        name: string;
        url: string;
        projectId: string | null;
    }[];
}

export type CategoryData = {
    id: number;
    name: string;
}