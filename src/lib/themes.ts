export type LayoutStyle = 'modern' | 'minimal' | 'compact' | 'creative';

export interface Layout {
  style: LayoutStyle;
  header: {
    type: 'banner' | 'simple' | 'centered';
    showPhoto: boolean;
  };
  sidebar: {
    position: 'left' | 'right' | 'none';
    width: 'narrow' | 'medium' | 'wide';
    background: 'colored' | 'light' | 'none';
  };
  sections: {
    style: 'timeline' | 'cards' | 'minimal';
    spacing: 'compact' | 'normal' | 'relaxed';
  };
  elements: {
    borders: 'none' | 'subtle' | 'solid';
    shadows: 'none' | 'subtle' | 'medium';
    icons: 'none' | 'minimal' | 'prominent' | 'outline';
  };
}

export interface Theme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    headings: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  spacing: {
    section: string;
    element: string;
  };
  layout: Layout;
}

export const themes: { [key: string]: Theme } = {
  'modern-blue': {
    id: 'modern-blue',
    name: 'Modern Blue',
    colors: {
      primary: '#7EB2DD',      // Bleu pastel doux
      secondary: '#B4D4EE',    // Bleu pastel clair
      accent: '#5B91C4',       // Bleu pastel profond
      background: '#FFFFFF',
      text: '#2C3E50',
      headings: '#34495E'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter'
    },
    spacing: {
      section: '2rem',
      element: '1.5rem'
    },
    layout: {
      style: 'modern',
      header: {
        type: 'banner',
        showPhoto: true
      },
      sidebar: {
        position: 'left',
        width: 'medium',
        background: 'colored'
      },
      sections: {
        style: 'timeline',
        spacing: 'normal'
      },
      elements: {
        borders: 'subtle',
        shadows: 'subtle',
        icons: 'minimal'
      }
    }
  },
  'simple-gray': {
    id: 'simple-gray',
    name: 'Simple Gray',
    colors: {
      primary: '#9CA3AF',      // Gris neutre
      secondary: '#D1D5DB',    // Gris clair
      accent: '#6B7280',       // Gris foncé
      background: '#FFFFFF',
      text: '#1F2937',
      headings: '#111827'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter'
    },
    spacing: {
      section: '2rem',
      element: '1.5rem'
    },
    layout: {
      style: 'minimal',
      header: {
        type: 'simple',
        showPhoto: true
      },
      sidebar: {
        position: 'right',
        width: 'narrow',
        background: 'light'
      },
      sections: {
        style: 'minimal',
        spacing: 'compact'
      },
      elements: {
        borders: 'none',
        shadows: 'none',
        icons: 'minimal'
      }
    }
  },
  'minimal-purple': {
    id: 'minimal-purple',
    name: 'Minimal Purple',
    colors: {
      primary: '#C3B1E1',      // Violet pastel doux
      secondary: '#D7C8EC',    // Violet pastel clair
      accent: '#A28CC9',       // Violet pastel profond
      background: '#FFFFFF',
      text: '#2D3748',
      headings: '#1A202C'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter'
    },
    spacing: {
      section: '2rem',
      element: '1.5rem'
    },
    layout: {
      style: 'minimal',
      header: {
        type: 'centered',
        showPhoto: true
      },
      sidebar: {
        position: 'none',
        width: 'narrow',
        background: 'none'
      },
      sections: {
        style: 'cards',
        spacing: 'relaxed'
      },
      elements: {
        borders: 'subtle',
        shadows: 'medium',
        icons: 'prominent'
      }
    }
  },
  'modern-emerald': {
    id: 'modern-emerald',
    name: 'Modern Emerald',
    colors: {
      primary: '#95D5B2',      // Vert pastel doux
      secondary: '#B7E4C7',    // Vert pastel clair
      accent: '#74C69D',       // Vert pastel profond
      background: '#FFFFFF',
      text: '#2D3748',
      headings: '#1A202C'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter'
    },
    spacing: {
      section: '2rem',
      element: '1.5rem'
    },
    layout: {
      style: 'modern',
      header: {
        type: 'banner',
        showPhoto: true
      },
      sidebar: {
        position: 'left',
        width: 'medium',
        background: 'colored'
      },
      sections: {
        style: 'timeline',
        spacing: 'normal'
      },
      elements: {
        borders: 'subtle',
        shadows: 'subtle',
        icons: 'minimal'
      }
    }
  },
  'modern-purple': {
    id: 'modern-purple',
    name: 'Modern Purple',
    colors: {
      primary: '#C3B1E1',      // Violet pastel doux
      secondary: '#D7C8EC',    // Violet pastel clair
      accent: '#A28CC9',       // Violet pastel profond
      background: '#FFFFFF',
      text: '#2D3748',
      headings: '#1A202C'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter'
    },
    spacing: {
      section: '2rem',
      element: '1.5rem'
    },
    layout: {
      style: 'modern',
      header: {
        type: 'banner',
        showPhoto: true
      },
      sidebar: {
        position: 'left',
        width: 'medium',
        background: 'colored'
      },
      sections: {
        style: 'timeline',
        spacing: 'normal'
      },
      elements: {
        borders: 'subtle',
        shadows: 'subtle',
        icons: 'minimal'
      }
    }
  },
  'modern-slate': {
    id: 'modern-slate',
    name: 'Modern Slate',
    colors: {
      primary: '#A2B5BB',      // Gris-bleu pastel
      secondary: '#C5D1D5',    // Gris-bleu pastel clair
      accent: '#89A0A8',       // Gris-bleu pastel profond
      background: '#FFFFFF',
      text: '#2D3748',
      headings: '#1A202C'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter'
    },
    spacing: {
      section: '2rem',
      element: '1.5rem'
    },
    layout: {
      style: 'modern',
      header: {
        type: 'banner',
        showPhoto: true
      },
      sidebar: {
        position: 'left',
        width: 'medium',
        background: 'colored'
      },
      sections: {
        style: 'timeline',
        spacing: 'normal'
      },
      elements: {
        borders: 'subtle',
        shadows: 'subtle',
        icons: 'minimal'
      }
    }
  },
  'modern-crimson': {
    id: 'modern-crimson',
    name: 'Modern Crimson',
    colors: {
      primary: '#E8B4B8',      // Rose pastel doux
      secondary: '#F1C9CC',    // Rose pastel clair
      accent: '#D49498',       // Rose pastel profond
      background: '#FFFFFF',
      text: '#2D3748',
      headings: '#1A202C'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter'
    },
    spacing: {
      section: '2rem',
      element: '1.5rem'
    },
    layout: {
      style: 'modern',
      header: {
        type: 'banner',
        showPhoto: true
      },
      sidebar: {
        position: 'left',
        width: 'medium',
        background: 'colored'
      },
      sections: {
        style: 'timeline',
        spacing: 'normal'
      },
      elements: {
        borders: 'subtle',
        shadows: 'subtle',
        icons: 'minimal'
      }
    }
  },
  'simple-dark': {
    id: 'simple-dark',
    name: 'Simple Dark',
    colors: {
      primary: '#ffffff',
      secondary: '#9ca3af',
      text: '#111827',
      background: '#1f2937',
      accent: '#6B7280',
      headings: '#1A202C'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter'
    },
    spacing: {
      section: '2rem',
      element: '1.5rem'
    },
    layout: {
      style: 'minimal',
      header: {
        type: 'simple',
        showPhoto: true
      },
      sidebar: {
        position: 'right',
        width: 'medium',
        background: 'colored'
      },
      sections: {
        style: 'minimal',
        spacing: 'normal'
      },
      elements: {
        borders: 'none',
        shadows: 'none',
        icons: 'none'
      }
    }
  }
};

export const defaultTheme: Theme = themes['modern-blue'];
