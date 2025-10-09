// kilocode_change - new file
import React, { useState } from "react"
import { VSCodeTextField, VSCodeButton, VSCodeDropdown, VSCodeOption } from "@vscode/webview-ui-toolkit/react"
import { FolderOpen, Rocket } from "lucide-react"
import { vscode } from "@src/utils/vscode"
import { useAppTranslation } from "@src/i18n/TranslationContext"
import BottomControls from "../kilocode/BottomControls"

interface AppBuilderViewProps {}

const APP_TYPES = [
	{ value: "react", label: "React Application", description: "Modern React app with Vite or CRA" },
	{ value: "nextjs", label: "Next.js Application", description: "Full-stack React framework" },
	{ value: "nodejs", label: "Node.js Application", description: "Backend Node.js server" },
	{ value: "python", label: "Python Application", description: "Python application or script" },
	{ value: "vue", label: "Vue.js Application", description: "Progressive JavaScript framework" },
	{ value: "angular", label: "Angular Application", description: "TypeScript-based web framework" },
	{ value: "express", label: "Express.js API", description: "Fast Node.js web framework" },
	{ value: "fastapi", label: "FastAPI Application", description: "Modern Python API framework" },
	{ value: "django", label: "Django Application", description: "Python web framework" },
	{ value: "flutter", label: "Flutter Application", description: "Cross-platform mobile app" },
	{ value: "custom", label: "Custom Application", description: "Specify your own requirements" },
]

const AppBuilderView: React.FC<AppBuilderViewProps> = () => {
	const { t } = useAppTranslation()
	const [appType, setAppType] = useState<string>("react")
	const [appName, setAppName] = useState<string>("")
	const [targetPath, setTargetPath] = useState<string>("")
	const [customRequirements, setCustomRequirements] = useState<string>("")
	const [isBuilding, setIsBuilding] = useState<boolean>(false)

	const handleBuildApp = () => {
		if (!appName.trim()) {
			vscode.postMessage({
				type: "showError",
				text: "Please enter an application name",
			})
			return
		}

		setIsBuilding(true)

		const options: Record<string, any> = {}
		if (customRequirements.trim()) {
			options.customRequirements = customRequirements
		}

		// Send message to extension to build the app
		vscode.postMessage({
			type: "buildApp",
			appType,
			appName: appName.trim(),
			targetPath: targetPath.trim() || undefined,
			options,
		})

		// Reset form after a short delay
		setTimeout(() => {
			setIsBuilding(false)
		}, 2000)
	}

	const handleSelectDirectory = () => {
		vscode.postMessage({
			type: "selectDirectory",
		})
	}

	const selectedAppType = APP_TYPES.find((type) => type.value === appType)

	return (
		<div style={{ padding: "15px 20px", height: "100%", overflow: "auto" }}>
			<div style={{ marginBottom: "30px" }}>
				<h2 style={{ marginBottom: "10px", fontSize: "20px", fontWeight: "500" }}>
					<Rocket style={{ display: "inline", marginRight: "8px", verticalAlign: "middle" }} size={24} />
					App Builder
				</h2>
				<p style={{ color: "var(--vscode-descriptionForeground)", marginBottom: "20px" }}>
					Let Kilo Code scaffold a new application for you. Select an app type, provide a name, and Kilo Code
					will create the entire project structure with best practices.
				</p>
			</div>

			<div style={{ maxWidth: "800px" }}>
				{/* App Type Selection */}
				<div style={{ marginBottom: "20px" }}>
					<label
						htmlFor="appType"
						style={{
							display: "block",
							marginBottom: "8px",
							fontWeight: "500",
							fontSize: "13px",
						}}>
						Application Type
					</label>
					<VSCodeDropdown
						id="appType"
						value={appType}
						onChange={(e: any) => setAppType(e.target.value)}
						style={{ width: "100%" }}>
						{APP_TYPES.map((type) => (
							<VSCodeOption key={type.value} value={type.value}>
								{type.label} - {type.description}
							</VSCodeOption>
						))}
					</VSCodeDropdown>
				</div>

				{/* App Name */}
				<div style={{ marginBottom: "20px" }}>
					<label
						htmlFor="appName"
						style={{
							display: "block",
							marginBottom: "8px",
							fontWeight: "500",
							fontSize: "13px",
						}}>
						Application Name *
					</label>
					<VSCodeTextField
						id="appName"
						value={appName}
						onInput={(e: any) => setAppName(e.target.value)}
						placeholder="my-awesome-app"
						style={{ width: "100%" }}
					/>
				</div>

				{/* Target Path */}
				<div style={{ marginBottom: "20px" }}>
					<label
						htmlFor="targetPath"
						style={{
							display: "block",
							marginBottom: "8px",
							fontWeight: "500",
							fontSize: "13px",
						}}>
						Target Directory (optional)
					</label>
					<div style={{ display: "flex", gap: "10px" }}>
						<VSCodeTextField
							id="targetPath"
							value={targetPath}
							onInput={(e: any) => setTargetPath(e.target.value)}
							placeholder="./projects/my-app"
							style={{ flex: 1 }}
						/>
						<VSCodeButton onClick={handleSelectDirectory} appearance="secondary">
							<FolderOpen size={16} style={{ marginRight: "4px" }} />
							Browse
						</VSCodeButton>
					</div>
					<p style={{ fontSize: "12px", color: "var(--vscode-descriptionForeground)", marginTop: "4px" }}>
						Leave empty to create in current workspace
					</p>
				</div>

				{/* Custom Requirements */}
				{appType === "custom" && (
					<div style={{ marginBottom: "20px" }}>
						<label
							htmlFor="customRequirements"
							style={{
								display: "block",
								marginBottom: "8px",
								fontWeight: "500",
								fontSize: "13px",
							}}>
							Custom Requirements
						</label>
						<VSCodeTextField
							id="customRequirements"
							value={customRequirements}
							onInput={(e: any) => setCustomRequirements(e.target.value)}
							placeholder="Describe what you want to build..."
							style={{ width: "100%" }}
						/>
					</div>
				)}

				{/* Additional Options for any app type */}
				<div style={{ marginBottom: "20px" }}>
					<label
						htmlFor="additionalOptions"
						style={{
							display: "block",
							marginBottom: "8px",
							fontWeight: "500",
							fontSize: "13px",
						}}>
						Additional Requirements (optional)
					</label>
					<VSCodeTextField
						id="additionalOptions"
						value={customRequirements}
						onInput={(e: any) => setCustomRequirements(e.target.value)}
						placeholder="e.g., Include authentication, Use Material-UI, Add testing setup..."
						style={{ width: "100%" }}
					/>
					<p style={{ fontSize: "12px", color: "var(--vscode-descriptionForeground)", marginTop: "4px" }}>
						Any special features or configurations you'd like to include
					</p>
				</div>

				{/* Build Button */}
				<div style={{ marginTop: "30px" }}>
					<VSCodeButton onClick={handleBuildApp} disabled={isBuilding || !appName.trim()}>
						<Rocket size={16} style={{ marginRight: "6px" }} />
						{isBuilding ? "Starting Build..." : "Build Application"}
					</VSCodeButton>
				</div>

				{/* Info Box */}
				<div
					style={{
						marginTop: "30px",
						padding: "15px",
						backgroundColor: "var(--vscode-textBlockQuote-background)",
						borderLeft: "4px solid var(--vscode-textLink-foreground)",
						borderRadius: "4px",
					}}>
					<p style={{ fontSize: "13px", margin: 0 }}>
						<strong>How it works:</strong> Kilo Code will create a new task to build your application. The AI
						will scaffold the project structure, set up necessary files and configurations, and provide
						instructions for running your new app.
					</p>
				</div>
			</div>

			<div style={{ height: "80px" }} />
			<BottomControls />
		</div>
	)
}

export default AppBuilderView
