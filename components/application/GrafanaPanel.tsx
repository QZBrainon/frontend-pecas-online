"use client";
import React, { useState } from "react";

interface GrafanaPanelProps {
  baseUrl?: string;
  dashboardUid: string;
  panelId: string;
  title: string;
  width?: string;
  height?: string;
  from?: string;
  to?: string;
  theme?: string;
  orgId?: string;
}

// Reusable Grafana Panel component
export default function GrafanaPanel({
  baseUrl = "https://play.grafana.org",
  dashboardUid,
  panelId,
  title,
  width = "100%",
  height = "400px",
  from = "now-6h",
  to = "now",
  theme = "light",
  orgId = "1",
}: GrafanaPanelProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  const params = new URLSearchParams({
    orgId,
    from,
    to,
    panelId,
    theme,
    kiosk: "true",
  });

  const iframeUrl = `${baseUrl}/d-solo/${dashboardUid}?${params.toString()}`;

  const handleLoad = () => setIsLoading(false);
  const handleError = () => {
    setIsLoading(false);
    setError("Failed to load panel");
  };

  return (
    <div style={{ width, height }} className="relative">
      {title && (
        <h3 className="text-lg font-semibold mb-3 text-gray-800">{title}</h3>
      )}

      <div
        className="border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white"
        style={{
          width: "100%",
          height: title ? "calc(100% - 2.5rem)" : "100%",
        }}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-600">Loading panel...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-red-50 z-10">
            <div className="text-red-600 text-center p-4">
              <p className="font-medium">Error loading panel</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        <iframe
          src={iframeUrl}
          width="100%"
          height="100%"
          title={title || `Grafana Panel ${panelId}`}
          onLoad={handleLoad}
          onError={handleError}
          style={{ display: error ? "none" : "block" }}
        />
      </div>
    </div>
  );
}
