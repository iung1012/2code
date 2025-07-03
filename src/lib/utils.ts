import { TreeItem } from "@/types"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface TreeNode {
  [key: string]: TreeNode | null
}

export function convertFilesToTreeItems(
  files: { [path: string]: string }
): TreeItem[] {
  const tree: TreeNode = {}; 
  const sortedPaths = Object.keys(files).sort();

  for (const filePath of sortedPaths) {
    const parts = filePath.split("/"); 
    let current = tree; 

    for (let i = 0; i < parts.length -1; i++) {
      const part = parts[i]; 
      if (!current[part]) {
        current[part] = {};
      }
      current = current[part];
    }

    const filename = parts[parts.length -1]; 
    current[filename] = null;
  }

  function convertNode(node: TreeNode, name?: string): TreeItem[] | TreeItem {
    const entries = Object.entries(node); 

    if (entries.length === 0) {
      return name || "";
    }

    const children: TreeItem[] = []; 

    for (const [key, value] of entries) {
      if (value === null) {
        // this is a file
        children.push(key);
      } else {
        // this is a folder
        const subTree = convertNode(value, key); 
        if (Array.isArray(subTree)) {
          children.push([key, ...subTree]);
        } else {
          children.push([key, subTree]);
        }
      }
    }

    return children;
  }

  const result = convertNode(tree);
  return Array.isArray(result) ? result : [result];
}

export function trimTaskSummary(str: string): string {
  const regex = new RegExp(`^<task_summary>+|</task_summary>+$`, 'g'); 
  return str.replace(regex, '');
}