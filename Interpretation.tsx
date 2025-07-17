import React from 'react';
import { marked } from 'marked';

interface InterpretationProps {
    text: string;
}

// Basic markdown to HTML renderer
const renderer = new marked.Renderer();

// Fix for marked v5+ API changes. Renderer methods now receive a single token object.
renderer.heading = (token: any) => {
    const { text, depth, raw } = token;
    const escapedText = raw.toLowerCase().replace(/[^\w]+/g, '-');
    if (depth === 2) {
        return `<h2 id="${escapedText}" class="text-2xl font-cinzel text-purple-300 mt-6 mb-3">${text}</h2>`;
    }
    if (depth === 3) {
        return `<h3 id="${escapedText}" class="text-xl font-cinzel text-amber-200 mt-4 mb-2">${text}</h3>`;
    }
    return `<h${depth} id="${escapedText}" class="text-lg mt-4 mb-2">${text}</h${depth}>`;
};

renderer.paragraph = (token: any) => `<p class="mb-4 text-stone-300 leading-relaxed">${token.text}</p>`;

renderer.list = (token: any) => `<ul class="list-disc list-inside mb-4 pl-4 text-stone-300">${token.body}</ul>`;

renderer.strong = (token: any) => `<strong class="font-bold text-amber-100">${token.text}</strong>`;

marked.setOptions({ renderer });


const Interpretation: React.FC<InterpretationProps> = ({ text }) => {
    const [visible, setVisible] = React.useState(false);
    
    React.useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const htmlContent = marked.parse(text);

    return (
        <div className={`mt-12 max-w-4xl mx-auto p-6 md:p-8 bg-stone-900/60 rounded-lg shadow-2xl shadow-purple-900/20 border border-purple-800/20 backdrop-blur-sm transition-opacity duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-3xl font-cinzel text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-amber-200 mb-6">
                Interpretacja Kart
            </h2>
            <div
                className="prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: htmlContent as string }}
            />
        </div>
    );
};

export default Interpretation;