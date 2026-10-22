import { lattesProjects } from './lattes-content';

// Compatibility export for code that still consumes the original static project list.
export const projects = lattesProjects.map(project => ({ ...project, description: project.summary }));
