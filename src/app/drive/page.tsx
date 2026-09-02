"use client";

import PageShell from "@/components/PageShell";
import { files } from "@/lib/data";
import {
  FileText,
  Image as ImageIcon,
  FileSpreadsheet,
  FileCode,
  Figma,
  File,
  Upload,
  FolderPlus,
  Users,
  MoreHorizontal,
} from "lucide-react";

const iconFor: Record<string, typeof FileText> = {
  PDF: FileText,
  Figma: Figma,
  Sheet: FileSpreadsheet,
  Code: FileCode,
  Image: ImageIcon,
  Doc: File,
};

const folders = [
  { name: "Client contracts", count: 12 },
  { name: "Design assets", count: 34 },
  { name: "Engineering docs", count: 21 },
  { name: "Finance", count: 8 },
];

export default function DrivePage() {
  const used = 62;
  return (
    <PageShell title="Drive" subtitle="Files and assets shared across your workspace">
      <div className="flex flex-col gap-24">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-16">
          <div className="card-ash flex items-center gap-24 sm:w-[320px]">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-8">
                <span className="text-caption text-smoke">Storage used</span>
                <span className="text-caption text-snow">{used}%</span>
              </div>
              <div className="h-8 rounded-tag bg-charcoal overflow-hidden">
                <div className="h-full rounded-tag bg-phosphor-green" style={{ width: `${used}%` }} />
              </div>
              <p className="text-caption text-smoke mt-8">31 GB of 50 GB used</p>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <button className="btn-pill-ghost">
              <FolderPlus size={14} />
              New folder
            </button>
            <button className="btn-pill-primary">
              <Upload size={14} />
              Upload
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-16">
          {folders.map((f) => (
            <div key={f.name} className="card flex flex-col gap-16 hover:border-graphite transition-colors cursor-pointer">
              <div className="h-32 w-32 rounded-input bg-ash border border-charcoal flex items-center justify-center">
                <FolderPlus size={16} className="text-phosphor-green" />
              </div>
              <div>
                <p className="text-body-sm text-snow truncate">{f.name}</p>
                <p className="text-caption text-smoke">{f.count} files</p>
              </div>
            </div>
          ))}
        </div>

        <div className="card p-0 overflow-hidden">
          <div className="flex items-center justify-between px-24 py-16 border-b border-charcoal">
            <h2 className="text-subheading text-snow">Recent files</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="table-th">Name</th>
                  <th className="table-th">Size</th>
                  <th className="table-th">Modified</th>
                  <th className="table-th">Shared</th>
                  <th className="table-th"></th>
                </tr>
              </thead>
              <tbody>
                {files.map((f) => {
                  const Icon = iconFor[f.type] ?? File;
                  return (
                    <tr key={f.name} className="hover:bg-ash/50 transition-colors">
                      <td className="table-td">
                        <div className="flex items-center gap-16">
                          <div className="h-32 w-32 rounded-input bg-ash border border-charcoal flex items-center justify-center shrink-0">
                            <Icon size={14} className="text-silver-mist" />
                          </div>
                          <span className="text-snow">{f.name}</span>
                        </div>
                      </td>
                      <td className="table-td">{f.size}</td>
                      <td className="table-td">{f.modified}</td>
                      <td className="table-td">
                        {f.shared ? (
                          <span className="pill-tag">
                            <Users size={12} className="text-phosphor-green" />
                            Shared
                          </span>
                        ) : (
                          <span className="text-smoke">Private</span>
                        )}
                      </td>
                      <td className="table-td text-right">
                        <button className="h-32 w-32 rounded-input hover:bg-white/[0.04] flex items-center justify-center ml-auto">
                          <MoreHorizontal size={14} className="text-smoke" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
